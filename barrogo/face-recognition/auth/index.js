$(document).ready(function () {
  $.Mustache.options.warnOnMissingTemplates = true;

  $.Mustache.load("app/template/template.html").done(function () {
    // login page
    Path.map("#/login").to(function () {
      $("#target").html("").append($.Mustache.render("login"));
      checkUserLogs();
      $("#scanQR").click(function () {
        $("#preview").show();
        let scanner = new Instascan.Scanner({
          video: document.getElementById("preview"),
          mirror: false,
        });
        Instascan.Camera.getCameras()
          .then((cameras) => {
            scanner.camera = cameras[cameras.length - 1];
            scanner.start();
          })
          .catch((e) => console.error(e));
        scanner.addListener("scan", (content) => {
          $.ajax({
            type: "POST",
            url: "api/login",
            dataType: "json",
            data: { userID: content },
          }).done(function (data) {
            if (parseInt(data.verified) === 0) {
              Swal.fire({
                icon: "error",
                title: "Invalid",
                text: "No User Found.",
              });
            } else {
              scanner.stop();
              localStorage.setItem("userLogs", JSON.stringify(data.info));
              window.location.href = "#/result";
            }
          });
        });
      });
    });

    // face recognition
    Path.map("#/result").to(function () {
      $("#target").html("").append($.Mustache.render("result"));
      checkUserLogs();

      $(document).ready(function () {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("models"),
          faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
        ]).then(startVideo);

        var vid;
        function startVideo() {
          navigator.getUserMedia(
            { video: {} },

            (stream) => {
              video.srcObject = stream;
              vid = stream.getTracks()[0];
              $("#video").get(0).play();
            },
            (err) => console.error(err)
          );
        }

        $("#video").on("playing", async function () {
          const labeledFaceDescriptors = await loadImages();
          const faceMatcher = new faceapi.FaceMatcher(
            labeledFaceDescriptors,
            0.6
          );
          const displaySize = { width: video.width, height: video.height };
          let ctr = 0;
          var playing = setInterval(async () => {
            const detection = await faceapi
              .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks()
              .withFaceDescriptor();
            if (!detection) {
              throw new Error(`no faces detected`);
            }
            const resizedDetection = faceapi.resizeResults(
              detection,
              displaySize
            );
            const results = faceMatcher.findBestMatch(
              resizedDetection.descriptor
            );
            if (results.label === "unknown") {
              Swal.fire({
                icon: "error",
                title: "Invalid",
                text: "Please try again.",
              });
            } else {
              ++ctr;
              if (ctr === 1) {
                clearInterval(playing);
                navigator.getUserMedia(
                  { video: {} },

                  () => {
                    vid.stop();
                  },
                  (err) => console.error(err)
                );
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Thank you",
                  showConfirmButton: false,
                  timer: 1500,
                });
                check_remarks(results);
                localStorage.removeItem("userLogs");
                setTimeout(() => {
                  window.location.href = "#/login";
                }, 1500);
              }
            }
          }, 100);
        });

        // load all images
        function loadImages() {
          let userLogs = localStorage.getItem("userLogs");
          userLogs = JSON.parse(userLogs);
          const userIDFolder = [userLogs[0]];

          return Promise.all(
            userIDFolder.map(async (id) => {
              const descriptions = [];
              for (let i = 1; i <= 5; i++) {
                const img = await faceapi.fetchImage(
                  `./api/uploads/images/${id}/${id}${i}.jpg`
                );
                const detections = await faceapi
                  .detectSingleFace(img)
                  .withFaceLandmarks()
                  .withFaceDescriptor();
                if (!img) {
                  console.log(`no faces detected for ${id}`);
                }
                descriptions.push(detections.descriptor);
              }
              return new faceapi.LabeledFaceDescriptors(id, descriptions);
            })
          );
        }

        // check time
        function check_remarks(result) {
          const date = new Date();

          if (date.getHours() == 9 && date.getMinutes > 15) {
            const remarks = "Late";
            time_in(remarks, result);
          } else if (date.getHours() > 15) {
            const remarks = "Late";
            time_in(remarks, result);
          } else {
            const remarks = "On Time";
            time_in(remarks, result);
          }
        }

        // insert time and remarks to db
        function time_in(remark, result) {
          $.ajax({
            type: "POST",
            url: "api/timeIn",
            dataType: "json",
            data: {
              fetchID: result.label,
              remarks: remark,
            },
          });
        }
      });
    });

    // register page
    Path.map("#/register").to(function () {
      $("#target").html("").append($.Mustache.render("register"));
      checkUserID();

      // set webcam
      Webcam.set({
        width: 320,
        height: 240,
        dest_width: 640,
        dest_height: 480,
        image_format: "jpeg",
        jpeg_quality: 90,
      });
      Webcam.attach("#my_camera");

      // container for images
      const imgSrc = [];
      // take snapshot
      $("#snapshotBtn").click(function () {
        Webcam.freeze();
        $(this).removeClass("btn btn-primary d-grid w-100");
        $(this).hide();
        $("#resetBtn").removeClass("btn btn-outline-dark d-grid w-100");
        $("#resetBtn").hide();
        $("#cameraBtns").show();
        $("#cameraBtns").addClass("d-flex flex-column");
      });

      // retake shot
      $("#retakeBtn").click(function () {
        Webcam.unfreeze();
        $("#cameraBtns").removeClass("d-flex flex-column");
        $("#cameraBtns").hide();
        $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
        $("#snapshotBtn").show();
        $("#resetBtn").addClass("btn btn-outline-dark d-grid w-100");
        $("#resetBtn").show();
      });

      // save image
      $("#saveBtn").click(function () {
        Webcam.snap((data_uri) => {
          if ($("#img1").attr("src") == "./app/img/gray-bg.jpg") {
            $("#img1").attr("src", data_uri);
            $("#cameraBtns").removeClass("d-flex flex-column");
            $("#cameraBtns").hide();
            $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
            $("#snapshotBtn").show();
            $("#resetBtn").addClass("btn btn-outline-dark d-grid w-100");
            $("#resetBtn").show();
          } else if ($("#img2").attr("src") == "./app/img/gray-bg.jpg") {
            $("#img2").attr("src", data_uri);
            $("#cameraBtns").removeClass("d-flex flex-column");
            $("#cameraBtns").hide();
            $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
            $("#snapshotBtn").show();
            $("#resetBtn").addClass("btn btn-outline-dark d-grid w-100");
            $("#resetBtn").show();
          } else if ($("#img3").attr("src") == "./app/img/gray-bg.jpg") {
            $("#img3").attr("src", data_uri);
            $("#cameraBtns").removeClass("d-flex flex-column");
            $("#cameraBtns").hide();
            $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
            $("#snapshotBtn").show();
            $("#resetBtn").addClass("btn btn-outline-dark d-grid w-100");
            $("#resetBtn").show();
          } else if ($("#img4").attr("src") == "./app/img/gray-bg.jpg") {
            $("#img4").attr("src", data_uri);
            $("#cameraBtns").removeClass("d-flex flex-column");
            $("#cameraBtns").hide();
            $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
            $("#snapshotBtn").show();
            $("#resetBtn").addClass("btn btn-outline-dark d-grid w-100");
            $("#resetBtn").show();
          } else {
            $("#img5").attr("src", data_uri);
            imgSrc[0] = $("#img1").attr("src");
            imgSrc[1] = $("#img2").attr("src");
            imgSrc[2] = $("#img3").attr("src");
            imgSrc[3] = $("#img4").attr("src");
            imgSrc[4] = $("#img5").attr("src");
            $("#cameraBtns").removeClass("d-flex flex-column");
            $("#cameraBtns").hide();
            $("#resetBtn").addClass("btn btn-outline-dark d-grid w-100");
            $("#resetBtn").show();
          }
        });
      });

      // reset images
      $("#resetBtn").click(function () {
        $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
        $("#snapshotBtn").show();
        $("#img1").attr("src", "./app/img/gray-bg.jpg");
        $("#img2").attr("src", "./app/img/gray-bg.jpg");
        $("#img3").attr("src", "./app/img/gray-bg.jpg");
        $("#img4").attr("src", "./app/img/gray-bg.jpg");
        $("#img5").attr("src", "./app/img/gray-bg.jpg");
      });

      // declaring variables
      var fullName = $("#fullName");
      var userName = $("#userName");
      var email = $("#email");
      var address = $("#address");
      var bDay = $("#bDay");
      var contact = $("#contact");
      var pass = $("#password");
      var confirmPass = $("#confirmPassword");

      // remove validation class
      function removeValidation() {
        fullName.removeClass("is-invalid");
        userName.removeClass("is-invalid");
        email.removeClass("is-invalid");
        address.removeClass("is-invalid");
        bDay.removeClass("is-invalid");
        contact.removeClass("is-invalid");
        pass.removeClass("is-invalid");
        confirmPass.removeClass("is-invalid");
      }

      // form submit
      $("#registerForm").submit(function (e) {
        e.preventDefault();
        if (imgSrc.length !== 5) {
          Swal.fire({
            icon: "error",
            title: "Invalid",
            text: "Profile Image is required.",
          });
        } else if (fullName.val() == "") {
          removeValidation();
          fullName.addClass("is-invalid");
        } else if (userName.val() == "") {
          removeValidation();
          userName.addClass("is-invalid");
          $("#unameFeedback").text("Please enter username.");
        } else if (email.val() == "") {
          removeValidation();
          email.addClass("is-invalid");
          $("#emailFeedback").text("Please enter Email Address.");
        } else if (address.val() == "") {
          removeValidation();
          address.addClass("is-invalid");
        } else if (bDay.val() == "") {
          removeValidation();
          bDay.addClass("is-invalid");
        } else if (contact.val() == "") {
          removeValidation();
          contact.addClass("is-invalid");
          $("#contactFeedback").text("Please enter your Contact Number.");
        } else if (isNaN(contact.val())) {
          removeValidation();
          contact.addClass("is-invalid");
          $("#contactFeedback").text("Please enter number only.");
        } else if (contact.val().length < 11 || contact.val().length > 11) {
          removeValidation();
          contact.addClass("is-invalid");
          $("#contactFeedback").text("Please enter 11 digits only.");
        } else if (pass.val() == "") {
          removeValidation();
          pass.addClass("is-invalid");
          $("#passwordFeedback").text("Please enter Password.");
        } else if (confirmPass.val() == "") {
          removeValidation();
          confirmPass.addClass("is-invalid");
          $("#confirmPasswordFeedback").text("Please enter Confirm Password.");
        } else if (pass.val().length < 8) {
          removeValidation();
          pass.addClass("is-invalid");
          $("#passwordFeedback").text(
            "Password must be at least 8 characters."
          );
        } else if (pass.val() !== confirmPass.val()) {
          removeValidation();
          confirmPass.addClass("is-invalid");
          $("#confirmPasswordFeedback").text("Password does not match.");
        } else {
          removeValidation();
          var currentYear = new Date();
          $.ajax({
            type: "POST",
            url: "api/signup",
            dataType: "json",
            data: {
              userID:
                currentYear.getFullYear().toString().slice(-2) +
                "-" +
                Math.random().toString(36).slice(-5).toLocaleUpperCase(),
              fullName: fullName.val(),
              username: userName.val(),
              email: email.val(),
              address: address.val(),
              birthday: bDay.val(),
              contact: contact.val(),
              password: pass.val(),
              profileImg: imgSrc,
            },
          }).done(function (data) {
            if (parseInt(data.verified) === 1) {
              localStorage.setItem("userID", JSON.stringify(data.id));
              localStorage.setItem(
                "userFullName",
                JSON.stringify(fullName.val())
              );
              window.location.href = "#/qr";
            } else if (data.user == 1) {
              removeValidation();
              userName.addClass("is-invalid");
              $("#unameFeedback").text("Username already exists.");
            } else if (data.email == 1) {
              removeValidation();
              email.addClass("is-invalid");
              $("#emailFeedback").text("Email address already exists.");
            }
          });
        }
      });
    });

    // qr code result
    Path.map("#/qr").to(function () {
      $("#target").html("").append($.Mustache.render("qr"));
      checkUserID();

      let userID = localStorage.getItem("userID");
      userID = JSON.parse(userID);
      let userFullName = localStorage.getItem("userFullName");
      userFullName = JSON.parse(userFullName);

      // generate qr code
      new QRCode(document.getElementById("qrcode"), userID);
      $("#userFullName").text(userFullName);

      $("#downloadQR").click(function () {
        html2canvas(document.querySelector("#qrCode")).then((canvas) => {
          saveAs(canvas.toDataURL(), userFullName + ".jpg");
        });

        function saveAs(uri, filename) {
          var link = document.createElement("a");

          if (typeof link.download === "string") {
            link.href = uri;
            link.download = filename;

            //Firefox requires the link to be in the body
            document.body.appendChild(link);

            //simulate click
            link.click();

            //remove the link when done
            document.body.removeChild(link);
          } else {
            window.open(uri);
          }
        }
        localStorage.removeItem("userID");
        localStorage.removeItem("userFullName");
        window.location.href = "#/login";
      });
    });

    Path.root("#/login");

    Path.listen();
  });
});

// check if the user is registered before to proceed to qr page
function checkUserID() {
  let userID = localStorage.getItem("userID");
  userID = JSON.parse(userID);

  if (userID !== null) {
    window.location.href = "#/qr";
  } else {
    window.location.href = "#/register";
  }
}

// check if the user is logged in
function checkUserLogs() {
  let userLogs = localStorage.getItem("userLogs");
  userLogs = JSON.parse(userLogs);

  if (userLogs !== null) {
    window.location.href = "#/result";
  } else {
    window.location.href = "#/login";
  }
}
