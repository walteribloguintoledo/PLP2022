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

      $("#snapshotBtn").click(function (e) {
        e.preventDefault();
        Webcam.set({
          width: 320,
          height: 240,
          image_format: "jpeg",
          jpeg_quality: 90,
          flip_horiz: true,
        });
        Webcam.attach("#my_camera");
        $("#my_camera").show();
        $(this).removeClass("btn btn-outline-primary d-grid w-100");
        $(this).hide();
        $("#cameraBtns").show();
        $("#cameraBtns").addClass("d-flex justify-content-evenly mt-4");
      });

      $("#takeImg").click(function (e) {
        e.preventDefault();

        Webcam.freeze();
        $(this).hide();
        $("#saveBtn").show();
        $("#takeAnotherBtn").show();
        $("#cancelBtn").addClass("btn-sm");
      });

      $("#takeAnotherBtn").click(function (e) {
        e.preventDefault();

        Webcam.unfreeze();
        $("#saveBtn").hide();
        $(this).hide();
        $("#takeImg").show();
        $("#cancelBtn").removeClass("btn-sm");
      });

      $("#saveBtn").click(function (e) {
        e.preventDefault();

        Webcam.snap((data_uri) => {
          $("#profileImg").val(data_uri);
        });
      });

      $("#cancelBtn").click(function (e) {
        e.preventDefault();
        $("#my_camera").hide();
        $("#cameraBtns").removeClass("d-flex justify-content-evenly mt-4");
        $("#cameraBtns").hide();
        $("#snapshotBtn").addClass("btn btn-outline-primary d-grid w-100");
        $("#snapshotBtn").show();
      });
    });

    Path.root("#/login");

    Path.listen();
  });
});
