// const imageUpload = document.getElementById("imageUpload");

// Promise.all([
//   faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//   faceapi.nets.faceLandmark68Net.loadFromUri("models"),
//   faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
// ]).then(start);

// async function start() {
//   const container = document.createElement("div");
//   container.style.position = "relative";
//   document.body.append(container);
//   const labeledFaceDescriptors = await loadLabeledImages();
//   const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
//   let image;
//   let canvas;
//   document.body.append("Loaded");
//   imageUpload.addEventListener("change", async () => {
//     if (image) image.remove();
//     if (canvas) canvas.remove();
//     image = await faceapi.bufferToImage(imageUpload.files[0]);
//     container.append(image);
//     canvas = faceapi.createCanvasFromMedia(image);
//     container.append(canvas);
//     const displaySize = { width: image.width, height: image.height };
//     faceapi.matchDimensions(canvas, displaySize);
//     const detections = await faceapi
//       .detectAllFaces(image)
//       .withFaceLandmarks()
//       .withFaceDescriptors();
//     const resizedDetections = faceapi.resizeResults(detections, displaySize);
//     const results = resizedDetections.map((d) =>
//       faceMatcher.findBestMatch(d.descriptor)
//     );
//     results.forEach((result, i) => {
//       const box = resizedDetections[i].detection.box;
//       const drawBox = new faceapi.draw.DrawBox(box, {
//         label: result.toString(),
//       });
//       drawBox.draw(canvas);
//     });
//   });
// }

// function loadLabeledImages() {
//   const labels = [
//     "Black Widow",
//     "Captain America",
//     "Captain Marvel",
//     "Hawkeye",
//     "Jim Rhodes",
//     "Thor",
//     "Tony Stark",
//   ];
//   return Promise.all(
//     labels.map(async (label) => {
//       const descriptions = [];
//       for (let i = 1; i <= 2; i++) {
//         const img = await faceapi.fetchImage(
//           `https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`
//         );
//         const detections = await faceapi
//           .detectSingleFace(img)
//           .withFaceLandmarks()
//           .withFaceDescriptor();
//         descriptions.push(detections.descriptor);
//       }

//       return new faceapi.LabeledFaceDescriptors(label, descriptions);
//     })
//   );
// }

// const compareBtn = document.querySelector("#compareBtn");
// const snapshotBtn = document.querySelector("#snapshotBtn");
// const snapshot = document.querySelector("#results");

// // Configure a few settings and attach camera
// Webcam.set({
//   width: 640,
//   height: 480,
//   dest_width: 640,
//   dest_height: 480,
//   image_format: "jpeg",
//   jpeg_quality: 90,
// });
// Webcam.attach("#my_camera");

// if (snapshotBtn) {
//   //Code to handle taking the snapshot and displaying it locally
//   snapshotBtn.addEventListener("click", () => {
//     // take snapshot and get image data
//     Webcam.snap((data_uri) => {
//       // display results in page
//       document.querySelector("#my_camera video").remove();
//       const img = document.createElement("img");
//       img.src = data_uri;
//       document.querySelector("#my_camera").append(img);
//       //document.querySelector("#img").src = data_uri;
//       compareBtn.style.display = "block";
//     });
//   });
// }

// function start() {
//   if (compareBtn) {
//     compareBtn.addEventListener("click", async () => {
//       const image = await faceapi.bufferToImage(snapshot);
//       const canvas = faceapi.createCanvasFromMedia(image);
//       document.body.append(canvas);
//       const displaySize = { width: image.width, height: image.height };
//       faceapi.matchDimensions(canvas, displaySize);
//       const detections = await faceapi
//         .detectAllFaces(image)
//         .withFaceLandmarks()
//         .withFaceDescriptors();
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
//       resizedDetections.forEach((detection) => {
//         const box = detection.detection.box;
//         const drawBox = new faceapi.draw.drawDetections(box, { label: "Face" });
//         drawBox.draw(canvas);
//       });
//     });
//   }
// }

$(document).ready(function () {
  $.Mustache.options.warnOnMissingTemplates = true;

  $.Mustache.load("app/template/template.html").done(function () {
    Path.map("#/login").to(function () {
      $("#target").html("").append($.Mustache.render("login"));
    });

    Path.map("#/register").to(function () {
      $("#target").html("").append($.Mustache.render("register"));
      checkUserID();
      // set webcam
      Webcam.set({
        width: 320,
        height: 240,
        image_format: "jpeg",
        jpeg_quality: 90,
        flip_horiz: true,
      });

      // take photo
      $("#snapshotBtn").click(function () {
        Webcam.attach("#my_camera");
        Webcam.unfreeze();
        $("#my_camera").show();
        $(this).removeClass("btn btn-outline-primary d-grid w-100");
        $(this).hide();
        $("#cameraBtns").show();
        $("#cameraBtns").addClass("d-flex justify-content-evenly mt-4");
        $("#takeImg").show();
        $("#cancelBtn").removeClass("btn-sm");
      });

      // take snapshot
      $("#takeImg").click(function () {
        Webcam.freeze();
        $(this).hide();
        $("#saveBtn").show();
        $("#retakeBtn").show();
        $("#cancelBtn").addClass("btn-sm");
      });

      // retake shot
      $("#retakeBtn").click(function () {
        Webcam.unfreeze();
        $("#saveBtn").hide();
        $(this).hide();
        $("#takeImg").show();
        $("#cancelBtn").removeClass("btn-sm");
      });

      // save image
      $("#saveBtn").click(function () {
        $("#my_camera").hide();

        Webcam.snap((data_uri) => {
          $("#profileImg").val(data_uri);
          $("#resultImg img").attr("src", data_uri);
          $("#resultImg").show();
        });
        $("#cameraBtns").removeClass("d-flex justify-content-evenly mt-4");
        $("#cameraBtns").hide();
        $(this).hide();
        $("#retakeBtn").hide();
        $("#cancelBtn").hide();
      });

      // cancel button
      $("#cancelBtn").click(function () {
        Webcam.unfreeze();
        $("#my_camera").hide();
        $("#cameraBtns").removeClass("d-flex justify-content-evenly mt-4");
        $("#cameraBtns").hide();
        $("#saveBtn").hide();
        $("#retakeBtn").hide();
        $("#snapshotBtn").addClass("btn btn-outline-primary d-grid w-100");
        $("#snapshotBtn").show();
      });

      // declaring variables
      var profileImg = $("#profileImg");
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
        if (profileImg.val() == "") {
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
          $.ajax({
            type: "POST",
            url: "api/signup",
            dataType: "json",
            data: {
              userID: Math.random().toString(36).slice(-5),
              fullName: fullName.val(),
              username: userName.val(),
              email: email.val(),
              address: address.val(),
              birthday: bDay.val(),
              contact: contact.val(),
              password: pass.val(),
              profileImg: profileImg.val(),
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
