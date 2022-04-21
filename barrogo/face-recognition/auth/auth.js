// function for idle timer
function idle() {
  let idleTime = 0;
  var timer = setInterval(() => {
    idleTime += 1;
    if (idleTime == 120) {
      // 2 minutes
      clearInterval(timer);
      window.location.hash === "#/login"
        ? window.location.reload()
        : (window.location.href = "#/login");
    }
  }, 1000);

  // Zero the idle timer on mouse movement and keyboard movement.
  $(document).mousemove(function () {
    idleTime = 0;
  });
  $(document).keypress(function () {
    idleTime = 0;
  });
}

// setting up the webcam
function webcamJS(width, height) {
  Webcam.set({
    width: width,
    height: height,
    dest_width: 640,
    dest_height: 480,
    image_format: "jpeg",
    jpeg_quality: 90,
    flip_horiz: true,
  });
  Webcam.attach("#my_camera");
}

function offWebcam() {
  Webcam.reset(); // turn off webcam
}

// remove input validation class
function removeValidation() {
  $("#employeeID").removeClass("is-invalid");
  $("#fullName").removeClass("is-invalid");
  $("#dept").removeClass("is-invalid");
}

// function for button class
function btnSettings() {
  $("#cameraBtns").removeClass("d-flex flex-column");
  $("#cameraBtns").hide();
  $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
  $("#snapshotBtn").show();
  $("#resetBtn").addClass("btn btn-outline-light d-grid w-100");
  $("#resetBtn").show();
}

// registration process
function registration() {
  idle();
  const width = 520,
    height = 380;
  webcamJS(width, height);

  // take snapshot
  $("#snapshotBtn").click(function () {
    Webcam.freeze();
    $(this).removeClass("btn btn-primary d-grid w-100");
    $(this).hide();
    $("#resetBtn").removeClass("btn btn-outline-light d-grid w-100");
    $("#resetBtn").hide();
    $("#cameraBtns").addClass("d-flex flex-column");
    $("#cameraBtns").show();
  });

  // retake shot
  $("#retakeBtn").click(function () {
    Webcam.unfreeze();
    btnSettings();
  });

  const imgSrc = []; // container for images
  const defaultImg = "./app/img/gray-bg.jpg"; // default image in carousel

  // save image
  $("#saveBtn").click(function () {
    Webcam.snap((data_uri) => {
      if ($("#img1").attr("src") == defaultImg) {
        $("#img1").attr("src", data_uri);
        imgSrc.push(data_uri);
        btnSettings();
      } else if ($("#img2").attr("src") == defaultImg) {
        $("#img2").attr("src", data_uri);
        imgSrc.push(data_uri);
        btnSettings();
      } else if ($("#img3").attr("src") == defaultImg) {
        $("#img3").attr("src", data_uri);
        imgSrc.push(data_uri);
        btnSettings();
      } else if ($("#img4").attr("src") == defaultImg) {
        $("#img4").attr("src", data_uri);
        imgSrc.push(data_uri);
        btnSettings();
      } else {
        $("#img5").attr("src", data_uri);
        imgSrc.push(data_uri);
        $("#cameraBtns").removeClass("d-flex flex-column");
        $("#cameraBtns").hide();
        $("#resetBtn").addClass("btn btn-outline-light d-grid w-100");
        $("#resetBtn").show();
        $("#register-btn").removeAttr("disabled");
      }
    });
  });

  // reset images
  $("#resetBtn").click(function () {
    $("#snapshotBtn").addClass("btn btn-primary d-grid w-100");
    $("#snapshotBtn").show();
    $(".img-carousel").attr("src", defaultImg);
    $("#register-btn").attr("disabled", true);
  });

  // declaring variables
  const employeeID = $("#employeeID"),
    fullName = $("#fullName"),
    dept = $("#dept");

  // form submit
  $("#registerForm").submit(function (e) {
    e.preventDefault();
    if (employeeID.val() == "") {
      removeValidation();
      employeeID.focus();
      employeeID.addClass("is-invalid");
      $("#feedback").text("Please enter your Employee ID Number.");
    } else if (fullName.val() == "") {
      removeValidation();
      fullName.focus();
      fullName.addClass("is-invalid");
    } else if (dept.val() == "") {
      removeValidation();
      dept.focus();
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
          employeeID.focus();
          employeeID.addClass("is-invalid");
          $("#feedback").text("Employee ID Number already exists.");
        } else {
          offWebcam();
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.reload();
        }
      });
    }
  });
}

// generate qr code
function generateQR() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  new QRCode(document.getElementById("qrcode"), user[1]);
  $("#userFullName").text(user[2]);

  // download qr code
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

// scan QR code
function scanQR(time) {
  var video = document.createElement("video");
  var canvasElement = document.getElementById("canvas");
  var canvas = canvasElement.getContext("2d");
  var loadingMessage = document.getElementById("loadingMessage");
  var stopVid = false;

  function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  // Use facingMode: environment to attempt to get the front camera on phones
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

  function tick() {
    loadingMessage.innerText = "⌛ Loading video...";
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;

      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF3B58"
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#FF3B58"
        );

        if (stopVid === false) {
          $.ajax({
            type: "POST",
            url: "api/login",
            dataType: "json",
            data: { userID: code.data, time: time.toUpperCase() },
          }).done(function (data) {
            stopVid = true;
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
                window.location.reload();
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
                  timer: 2000,
                }).then(() => {
                  localStorage.setItem("userLogs", JSON.stringify(data.data));
                  localStorage.setItem(
                    "type",
                    JSON.stringify(time.toUpperCase())
                  );
                  localStorage.setItem("remarks", data.info);
                  localStorage.setItem("attempts", 2);
                  window.location.reload();
                });
              }
            }
          });
        }
      }
    }
    if (!stopVid) {
      requestAnimationFrame(tick);
    }
  }
}

// face api models
function models() {
  // show loading screen
  $("div.spanner").addClass("show");
  $("div.overlay").addClass("show");
  Promise.all([
    faceapi.nets.faceLandmark68Net.loadFromUri("models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
  ]).then(start);
}

// setting up face recognition
async function start() {
  const labeledFaceDescriptors = await loadImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5);

  const width = 800,
    height = 600;
  webcamJS(width, height);

  Webcam.on("live", function () {
    // remove loading screen
    $("div.spanner").removeClass("show");
    $("div.overlay").removeClass("show");
    $("#laser").removeClass("d-none"); // show laser

    setTimeout(() => {
      Webcam.snap((data_uri) => {
        $("#result").attr("src", data_uri);
        faceRecognition(faceMatcher);
      });
    }, 1500);
  });
}

// start face recognition
async function faceRecognition(faceMatcher) {
  const img = document.querySelector("#result");
  const detection = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  // get number attempts
  let attempts = localStorage.getItem("attempts");
  attempts = JSON.parse(attempts);

  if (detection) {
    const displaySize = { width: img.width, height: img.height };
    const resizedDetection = faceapi.resizeResults(detection, displaySize);
    const result = faceMatcher.findBestMatch(resizedDetection.descriptor);

    if (result.label === "unknown") {
      if (attempts == 0) {
        Swal.fire({
          icon: "error",
          title: "Invalid",
          html:
            "Face not match." +
            "<br>" +
            "<p class='text-danger'>Attempts has been exceeded.</p>",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          $("#result").attr("src", "");
          localStorage.removeItem("attempts");
          localStorage.removeItem("type");
          localStorage.removeItem("userLogs");
          localStorage.removeItem("remarks");
          window.location.reload();
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
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          localStorage.setItem("attempts", JSON.stringify(attempts - 1));
          window.location.reload();
        });
      }
    } else {
      insert_attendance(result);
    }
  } else {
    if (attempts == 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid",
        html:
          "No Faces Detected." +
          "<br>" +
          "<p class='text-danger'>Attempts has been exceeded.</p>",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        $("#result").attr("src", "");
        localStorage.removeItem("attempts");
        localStorage.removeItem("type");
        localStorage.removeItem("userLogs");
        localStorage.removeItem("remarks");
        window.location.reload();
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
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        localStorage.setItem("attempts", JSON.stringify(attempts - 1));
        window.location.reload();
      });
    }
  }
}

// load all images for face recognition
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
        if (!detections) {
          console.log(`no faces detected for ${id}`);
        }
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(id, descriptions);
    })
  );
}

// insert attendance
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
      const finalPhrase = category.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
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
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        $("#result").attr("src", "");
        localStorage.removeItem("attempts");
        localStorage.removeItem("userLogs");
        localStorage.removeItem("type");
        localStorage.removeItem("remarks");
        window.location.reload();
      });
    }
  });
}

// check if the user is registered before to proceed to qr page
function checkRegisteredUser() {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  user !== null
    ? (window.location.href = "#/register")
    : (window.location.href = "#/login");
}

// check if the user is logged in
function checkUserLogs() {
  let userLogs = localStorage.getItem("userLogs");
  userLogs = JSON.parse(userLogs);

  if (userLogs !== null) {
    window.location.href = "#/login";
  } else {
    window.location.href = "#/register";
  }
}

// render templates
$(document).ready(function () {
  $.Mustache.options.warnOnMissingTemplates = true;

  $.Mustache.load("app/template/template.html").done(function () {
    // register page
    Path.map("#/register").to(function () {
      checkUserLogs();
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      if (user !== null) {
        $("#target").html("").append($.Mustache.render("qr"));
        generateQR();
      } else {
        $("#target").html("").append($.Mustache.render("register"));
        registration();
      }
    });

    // login page
    Path.map("#/login").to(function () {
      $("title").html("Face Recognition").after($.Mustache.render("styles"));
      $("#target").html("").append($.Mustache.render("login"));
      $("#timeWrapper").html("").append($.Mustache.render("timeDisplay"));
      clock(); // running time

      let userLogs = localStorage.getItem("userLogs");
      userLogs = JSON.parse(userLogs);

      if (userLogs !== null) {
        $("#loginWrapper").html("").append($.Mustache.render("faceScan"));
        models();
      } else {
        $("#loginWrapper").html("").append($.Mustache.render("qrScan"));
        offWebcam();
        checkRegisteredUser();

        $(".scanQR").click(function () {
          idle();
          $("#loginContainer").removeClass("d-md-flex");
          $("#loginContainer").addClass("d-none");
          $("#scannerWrapper").removeClass("d-none");

          const time = $(this).val();
          scanQR(time);
        });

        $("#backBtn").click(function () {
          window.location.reload();
        });
      }
    });

    Path.root("#/login");

    Path.listen();
  });
});
