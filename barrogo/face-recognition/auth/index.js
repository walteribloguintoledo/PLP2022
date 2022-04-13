$(document).ready(function () {
  $.Mustache.options.warnOnMissingTemplates = true;

  $.Mustache.load("app/template/template.html").done(function () {
    // login page
    Path.map("#/login").to(function () {
      $("title").html("Face Recognition").after($.Mustache.render("styles"));
      $("#target").html("").append($.Mustache.render("login"));
      $("#timeWrapper").html("").append($.Mustache.render("timeDisplay"));
      checkUserLogs();
      clock();

      let scanner = new Instascan.Scanner({
        video: document.getElementById("preview"),
      });

      $(".scanQR").click(function () {
        const time = $(this).val();
        $("#loginContainer").removeClass("d-md-flex");
        $("#loginContainer").addClass("d-none");
        Instascan.Camera.getCameras()
          .then(function (cameras) {
            if (cameras.length > 0) {
              scanner.start(cameras[0]);
              setTimeout(() => {
                $("#scannerWrapper").removeClass("d-none");
                $("#laser").removeClass("d-none");
              }, 1200);
            } else {
              console.error("No cameras found.");
            }
          })
          .catch(function (e) {
            console.error(e);
          });
        scanner.addListener("scan", function (content) {
          $.ajax({
            type: "POST",
            url: "api/login",
            dataType: "json",
            data: { userID: content, time: time.toUpperCase() },
          }).done(function (data) {
            scanner.stop();
            $("#scannerWrapper").addClass("d-none");
            $("#laser").addClass("d-none");
            $("#loginContainer").removeClass("d-none");
            if (data.verified == 0) {
              Swal.fire({
                icon: "error",
                title: "Invalid",
                text: "No user found.",
              }).then(() => {
                window.location.reload();
              });
            } else {
              if (data.record !== 0) {
                Swal.fire({
                  icon: "error",
                  title: "Invalid",
                  html:
                    "Hey, " +
                    data.record[1] +
                    ". " +
                    " You already " +
                    "<span class='text-lowercase'>" +
                    data.record[5] +
                    ".</span>" +
                    "<br>" +
                    "Date: " +
                    data.record[3] +
                    "<br>" +
                    "Time: " +
                    data.record[4],
                }).then(() => {
                  window.location.reload();
                });
              } else if (data.info == null) {
                localStorage.setItem("userLogs", JSON.stringify(data.data));
                localStorage.setItem(
                  "type",
                  JSON.stringify(time.toUpperCase())
                );
                localStorage.setItem("remarks", data.info);
                localStorage.setItem("attempts", 2);
                window.location.href = "#/result";
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Note",
                  html:
                    "Hi, " +
                    data.data[2] +
                    "." +
                    "<br>" +
                    "<br>" +
                    "Your Last Attendance:" +
                    "<br>" +
                    "<p class='text-warning'>" +
                    data.info +
                    "</p>",
                  showConfirmButton: false,
                  timer: 2500,
                }).then(() => {
                  localStorage.setItem("userLogs", JSON.stringify(data.data));
                  localStorage.setItem(
                    "type",
                    JSON.stringify(time.toUpperCase())
                  );
                  localStorage.setItem("remarks", data.info);
                  localStorage.setItem("attempts", 2);
                  window.location.href = "#/result";
                });
              }
            }
          });
        });
      });

      $("#backBtn").click(function () {
        scanner.stop();
        $("#laser").addClass("d-none");
        $("#scannerWrapper").addClass("d-none");
        $("#loginContainer").removeClass("d-none");
      });
    });

    // face recognition
    Path.map("#/result").to(function () {
      $("title").html("Face Recognition").after($.Mustache.render("styles"));
      $("#target").html("").append($.Mustache.render("result"));
      $("#timeWrapper").html("").append($.Mustache.render("timeDisplay"));
      checkUserLogs();
      clock();

      $(document).ready(function () {
        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
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
            },
            (err) => console.error(err)
          );
        }

        setTimeout(() => {
          $("div.spanner").removeClass("show");
          $("div.overlay").removeClass("show");
          $("#scanWrapper").removeClass("d-none");
          $("#scanWrapper").addClass("d-md-flex align-items-center");
          $("#video").get(0).play();
        }, 3000);

        $("#video").on("playing", async function () {
          const labeledFaceDescriptors = await loadImages();
          const faceMatcher = new faceapi.FaceMatcher(
            labeledFaceDescriptors,
            0.5
          );
          const displaySize = { width: video.width, height: video.height };
          let ctr = 0;
          var playing = setInterval(async () => {
            const detection = await faceapi
              .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks()
              .withFaceDescriptor();
            if (!detection) {
              ++ctr;
              if (ctr == 1) {
                clearInterval(playing);
                let attempts = localStorage.getItem("attempts");
                attempts = JSON.parse(attempts);
                localStorage.setItem(
                  "attempts",
                  JSON.stringify(attempts - ctr)
                );
                if (attempts == 0) {
                  Swal.fire({
                    icon: "error",
                    title: "Invalid",
                    html:
                      "No Faces Detected." +
                      "<br>" +
                      "<p class='text-danger'>Attempts has been exceeded.</p>",
                  }).then(() => {
                    stopVideo();
                    localStorage.removeItem("attempts");
                    localStorage.removeItem("type");
                    localStorage.removeItem("userLogs");
                    localStorage.removeItem("remarks");
                    window.location.href = "#/login";
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Invalid",
                    html:
                      "No Faces Detected. Please try again." +
                      "<br>" +
                      "<small class='text-warning'>You only have " +
                      attempts +
                      " tries attempt.</small>",
                  }).then(() => {
                    window.location.reload();
                  });
                  throw new Error(`no faces detected`);
                }
              }
            } else {
              const resizedDetection = faceapi.resizeResults(
                detection,
                displaySize
              );
              const results = faceMatcher.findBestMatch(
                resizedDetection.descriptor
              );
              if (results.label === "unknown") {
                ++ctr;
                if (ctr === 1) {
                  clearInterval(playing);
                  let attempts = localStorage.getItem("attempts");
                  attempts = JSON.parse(attempts);
                  localStorage.setItem(
                    "attempts",
                    JSON.stringify(attempts - ctr)
                  );
                  if (attempts == 0) {
                    Swal.fire({
                      icon: "error",
                      title: "Invalid",
                      html:
                        "Face not match." +
                        "<br>" +
                        "<p class='text-danger'>Attempts has been exceeded.</p>",
                    }).then(() => {
                      stopVideo();
                      localStorage.removeItem("attempts");
                      localStorage.removeItem("type");
                      localStorage.removeItem("userLogs");
                      localStorage.removeItem("remarks");
                      window.location.href = "#/login";
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Invalid",
                      html:
                        "Face not match. Please try again." +
                        "<br>" +
                        "<small class='text-warning'>You only have " +
                        attempts +
                        " tries attempt.</small>",
                    }).then(() => {
                      window.location.reload();
                    });
                  }
                }
              } else {
                ++ctr;
                if (ctr === 1) {
                  clearInterval(playing);
                  stopVideo();
                  insert_attendance(results);
                }
              }
            }
          }, 100);
        });

        // stop video
        function stopVideo() {
          navigator.getUserMedia(
            { video: {} },

            () => {
              vid.stop();
            },
            (err) => console.error(err)
          );
        }

        // load all images
        function loadImages() {
          let userLogs = localStorage.getItem("userLogs");
          userLogs = JSON.parse(userLogs);
          const userIDFolder = [userLogs[1]];

          return Promise.all(
            userIDFolder.map(async (id) => {
              const descriptions = [];
              for (let i = 1; i <= 5; i++) {
                const img = await faceapi.fetchImage(
                  `./api/uploads/images/${id}/${id}-${i}.jpg`
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

        // insert record
        function insert_attendance(result) {
          let type = localStorage.getItem("type");
          type = JSON.parse(type);
          let remarks = localStorage.getItem("remarks");

          $.ajax({
            type: "POST",
            url: "api/attendance",
            dataType: "json",
            data: {
              fetchID: result.label,
              type: type,
              remarks: remarks,
            },
          }).done(function (data) {
            if (data.verified == 1) {
              const category = data.data[5].toLowerCase();
              const finalPhrase = category.replace(
                /(^\w{1})|(\s+\w{1})/g,
                (letter) => letter.toUpperCase()
              );
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Thank you, " + data.data[1] + ".",
                html:
                  "Date: " +
                  data.data[3] +
                  "<br>" +
                  "Time: " +
                  data.data[4] +
                  "<br>" +
                  "Category: " +
                  finalPhrase,
              }).then(() => {
                localStorage.removeItem("attempts");
                localStorage.removeItem("userLogs");
                localStorage.removeItem("type");
                localStorage.removeItem("remarks");
                window.location.href = "#/login";
              });
            }
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
        width: 520,
        height: 380,
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
        $("#resetBtn").addClass("btn btn-outline-light d-grid w-100");
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
            $("#resetBtn").addClass("btn btn-outline-light d-grid w-100");
            $("#resetBtn").show();
          } else if ($("#img2").attr("src") == "./app/img/gray-bg.jpg") {
            $("#img2").attr("src", data_uri);
            $("#cameraBtns").removeClass("d-flex flex-column");
            $("#cameraBtns").hide();
            $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
            $("#snapshotBtn").show();
            $("#resetBtn").addClass("btn btn-outline-light d-grid w-100");
            $("#resetBtn").show();
          } else if ($("#img3").attr("src") == "./app/img/gray-bg.jpg") {
            $("#img3").attr("src", data_uri);
            $("#cameraBtns").removeClass("d-flex flex-column");
            $("#cameraBtns").hide();
            $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
            $("#snapshotBtn").show();
            $("#resetBtn").addClass("btn btn-outline-light d-grid w-100");
            $("#resetBtn").show();
          } else if ($("#img4").attr("src") == "./app/img/gray-bg.jpg") {
            $("#img4").attr("src", data_uri);
            $("#cameraBtns").removeClass("d-flex flex-column");
            $("#cameraBtns").hide();
            $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
            $("#snapshotBtn").show();
            $("#resetBtn").addClass("btn btn-outline-light d-grid w-100");
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
            $("#resetBtn").addClass("btn btn-outline-light d-grid w-100");
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
      var employeeID = $("#employeeID");
      var fullName = $("#fullName");
      var dept = $("#dept");

      // remove validation class
      function removeValidation() {
        employeeID.removeClass("is-invalid");
        fullName.removeClass("is-invalid");
        dept.removeClass("is-invalid");
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
        } else if (employeeID.val() == "") {
          removeValidation();
          employeeID.addClass("is-invalid");
        } else if (fullName.val() == "") {
          removeValidation();
          fullName.addClass("is-invalid");
        } else if (dept.val() == "") {
          removeValidation();
          dept.addClass("is-invalid");
        } else {
          removeValidation();
          $.ajax({
            type: "POST",
            url: "api/signup",
            dataType: "json",
            data: {
              employeeID: employeeID.val(),
              fullName: fullName.val(),
              dept: dept.val(),
              profileImg: imgSrc,
            },
          }).done(function (data) {
            if (data.user == 1) {
              removeValidation();
              employeeID.addClass("is-invalid");
              $("#feedback").text("Employee ID Number already exists.");
            } else {
              localStorage.setItem("user", JSON.stringify(data.user));
              window.location.href = "#/qr";
            }
          });
        }
      });
    });

    // qr code result
    Path.map("#/qr").to(function () {
      $("#target").html("").append($.Mustache.render("qr"));
      checkUserID();

      let user = localStorage.getItem("user");
      user = JSON.parse(user);

      // generate qr code
      new QRCode(document.getElementById("qrcode"), user[1]);
      $("#userFullName").text(user[2]);

      $("#downloadQR").click(function () {
        html2canvas(document.querySelector("#qrCode")).then((canvas) => {
          saveAs(canvas.toDataURL(), user[2] + ".jpg");
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
        localStorage.removeItem("user");
        window.location.href = "#/login";
      });
    });

    Path.root("#/login");

    Path.listen();
  });
});

// check if the user is registered before to proceed to qr page
function checkUserID() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  if (user !== null) {
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

// running time
function clock() {
  setInterval(() => {
    const d = new Date();
    const time = d.toLocaleString("default", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    $("#realTime").text(time);
  }, 1000);

  const d = new Date();
  const date = d.toLocaleString("default", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  $("#dateToday").text(date);
}
