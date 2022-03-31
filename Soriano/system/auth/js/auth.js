$(document).ready(function () {
    $.Mustache.options.warnOnMissingTemplates = true;

    var paths = {
        "home": "#/home",
        "login": "#/login",
        "profile": "#/profile",
        "scan": "#/scan-qr",
    };

    function resetErrorMessages() {
        $(".error-input-field").empty();

        $(".form-control").removeClass("is-invalid");
    }

    function displayAlertMessage(message) {
        const id = "alert";
        var alertElem = $("#" + id);

        resetErrorMessages();

        if (alertElem.hasClass("d-none")) {
            var errorInputFieldElems = $(".error-input-field");
            errorInputFieldElems.empty();

            var messageElem = $("#" + id + "-message");
            messageElem.empty();
            messageElem.text($.trim(message));

            alertElem.toggleClass("d-none");

            return;
        }

        return;
    }

    function displayFieldErrorMessage(elem, message) {
        var alertElems = $(".alert");
        if (!alertElems.hasClass("d-none")) alertElems.toggleClass("d-none");

        resetErrorMessages();

        var errorElem = $("div").find(`[data-validation-id='${elem.attr("id")}']`), name = "";

        if (attr = elem.attr('placeholder')) {
            name = attr;
        } else if (dataName = errorElem.attr("data-validation-name")) {
            name = dataName;
        } else {
            name = "This field"
        }

        if (!elem.hasClass("is-invalid")) elem.toggleClass("is-invalid");

        errorElem.empty();

        errorElem.text($.trim(name) + " " + $.trim(message));
    }

    function checkifEmpty(elem) {
        return elem.val().replace(/\s/g, "") === "" ? displayFieldErrorMessage(elem, "is required.") : false;
    }

    function checkContactNumber(elem) {
        var size = 11;

        return elem.val().length < size ? alert(elem.attr("id") + " must be " + size + " digits.") : false;
    }

    function checkPassword(elem, elemConfirm) {
        var size = 8;
        if (elem.val().length < 8) return displayFieldErrorMessage(elem, " must be " + size + " characters.");

        if (elem.val() !== elemConfirm.val()) return displayFieldErrorMessage(elem, "doesn't match");

        return false;
    }

    function webcamJs() {
        $('#exampleModal').modal('show');

        preview_snapshot();

        var div = $("<div id='block' class='d-flex align-items-center justify-content-center' style='z-index: 10000; background-color: rgb(0, 0, 0, 0.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0;'>"
            + "<h4 class='text-white'>Getting Ready <span></span></h4>"
            + "</div>");
        $('body').append(div);

        var counter = 3;
        var counterIntervalId = setInterval(function () {
            $("#block h4 span").empty();
            $("#block h4 span").append(counter);

            counter--;
        }, 1000);

        setTimeout(function () {
            $("#block").remove();
            clearInterval(counterIntervalId);
        }, 3000);

        Webcam.set({
            // live preview size
            width: 470,
            height: 400,

            // device capture size
            dest_width: 320,
            dest_height: 240,

            // final cropped size
            crop_width: 320,
            crop_height: 240,

            // format and quality
            image_format: 'jpeg',
            jpeg_quality: 100,

            // flip horizontal (mirror mode)
            flip_horiz: true
        });

        Webcam.attach('#my_camera');
    }

    $.Mustache.load("templates.html").done(function () {
        Path.map("#/scan-qr").to(function () {
            localStorage.removeItem("user");

            $("#target").html("").append($.Mustache.render("scan-qr"));

            var video = document.createElement("video");
            var canvasElement = document.getElementById("canvas");
            var canvas = canvasElement.getContext("2d");
            var loadingMessage = document.getElementById("loadingMessage");
            var outputContainer = document.getElementById("output");
            // var outputMessage = document.getElementById("outputMessage");
            var outputData = document.getElementById("outputData");
            var isPaused = false;

            function drawLine(begin, end, color) {
                canvas.beginPath();
                canvas.moveTo(begin.x, begin.y);
                canvas.lineTo(end.x, end.y);
                canvas.lineWidth = 4;
                canvas.strokeStyle = color;
                canvas.stroke();
            }

            // Use facingMode: environment to attemt to get the front camera on phones
            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function (stream) {
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
                    // outputContainer.hidden = false;

                    canvasElement.height = video.videoHeight;
                    canvasElement.width = video.videoWidth;
                    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                    var code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });

                    if (code) {
                        drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                        drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                        drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
                        // outputMessage.hidden = true;
                        outputData.parentElement.hidden = false;
                        // outputData.innerText = code.data;

                        if (isPaused === false) {
                            $.ajax({
                                type: "POST",
                                url: "../api/scan-qr",
                                dataType: "json",
                                data: {
                                    "id": code.data,
                                },
                                success: function (data) {
                                    // video.pause();
                                    // video.srcObject.getTracks().forEach(function (track) {
                                    //     track.stop();
                                    // });

                                    isPaused = true;

                                    $(".btn-scan-qr-container").show();

                                    if (!data.verified && data.error) {
                                        $('.alert-container').show();
                                        $('.alert span').html(data.message);

                                        return console.log(data.message);
                                    }

                                    webcamJs();
                                    localStorage.setItem('user', JSON.stringify(data.result));
                                }
                            });
                        }
                    } else {
                        // outputMessage.hidden = false;
                        outputData.parentElement.hidden = true;
                    }
                }

                if (!isPaused) {
                    requestAnimationFrame(tick);
                }
            }

            async function single_photo() {
                Webcam.snap(function (data_uri) {
                    //close web camera
                    Webcam.unfreeze();

                    if ($('#my_camera').children().length > 0) {
                        Webcam.reset();
                    }

                    $('#my_camera').empty();
                    $('#my_camera').hide();

                    $('#result-container').show();
                    $('#result-container').prepend('<img id="result" src="' + data_uri + '" class="w-100" style="height: 400px"/>');
                });

                var currentUser = JSON.parse(localStorage.getItem('user'));

                async function face() {

                    const MODEL_URL = 'js/weights'

                    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
                    await faceapi.loadFaceLandmarkModel(MODEL_URL) // model to detect face landmark
                    await faceapi.loadFaceRecognitionModel(MODEL_URL) //model to Recognise Face

                    const img = document.getElementById('result')
                    let faceDescriptions = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    // .withFaceExpressions()
                    if (!faceDescriptions) if (!alert('No face detected!')) { window.location.reload(); }

                    const canvas = $('#reflay').get(0)
                    faceapi.matchDimensions(canvas, img)

                    faceDescriptions = faceapi.resizeResults(faceDescriptions, img)
                    faceapi.draw.drawDetections(canvas, faceDescriptions)

                    var labels = []

                    for (let i = 1; i <= 5; i++) {
                        labels.push(`${currentUser.name} ${i}`);
                    }

                    const labeledFaceDescriptors = await Promise.all(
                        labels.map(async label => {

                            const ext = ".png";
                            const dir = `../api/uploads/images/${currentUser.id}/`;
                            const imgUrl = `${dir}${label}${ext}`
                            const img = await faceapi.fetchImage(imgUrl)
                            const faceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

                            if (!faceDescription) {
                                throw new Error(`no faces detected for ${label}`)
                            }

                            const faceDescriptors = [faceDescription.descriptor]
                            return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
                        })
                    );

                    const threshold = 0.3
                    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, threshold)

                    const result = faceMatcher.findBestMatch(faceDescriptions.descriptor)

                    const box = faceDescriptions.detection.box
                    const text = result.toString()
                    const drawBox = new faceapi.draw.DrawBox(box, { label: text })
                    drawBox.draw(canvas)

                    console.log(result)

                    return result
                }

                return face()
            }

            $("#save-photo").click(function () {
                single_photo().then(function (result) {
                    if (!result || result._label === 'unknown') return

                    var currentUser = JSON.parse(localStorage.getItem('user'));

                    $.ajax({
                        type: "POST",
                        url: "../api/attendance",
                        dataType: "json",
                        data: {
                            "id": currentUser.id
                        },
                        success: function (data) {
                            $(".alert-snapshot-container").show()
                            $(".alert-snapshot-container .alert").addClass("alert-"+data.alert)
                            $(".alert-snapshot-container .alert span").empty()
                            $(".alert-snapshot-container .alert span").append(data.message)

                            console.log(data)
                        }
                    });
                })
            })

            $(".btn-enable-scan-qr").click(function () {
                video.play()
                isPaused = false

                setTimeout(function() {
                    requestAnimationFrame(tick)
                }, 1000)

                $(".btn-scan-qr-container").hide()
                // window.location.reload()
            });
        });

        Path.map("#/login").to(function () {
            var currentUser = JSON.parse(localStorage.getItem('user'));

            $("#target").html("").append($.Mustache.render("login"));

            if (currentUser !== null) window.location.href = paths.profile;

            $("#login-form").on('submit', function (event) {
                event.preventDefault();

                var password = $('#password-field'), username = $('#username');

                if (checkifEmpty(username) !== false) return;

                $.ajax({
                    type: "POST",
                    url: "../api/login",
                    dataType: "json",
                    data: {
                        "username": $.trim(username.val()),
                        "password": password.val()
                    },
                    success: function (data) {
                        if (!data.verified && data.error) {
                            return displayAlertMessage(data.message);
                        }

                        localStorage.setItem('user', JSON.stringify(data.result));
                        window.location.href = paths.profile;
                    }
                });
            });
        });

        Path.map("#/signup").to(function () {
            $("#target").html("").append($.Mustache.render("signup"));

            var currentUser = JSON.parse(localStorage.getItem('user'));

            if (currentUser !== null) window.location.href = paths.profile;

            var fullName = $('#full-name'),
                userName = $('#user-name'),
                email = $('#email-address'),
                address = $('#address'),
                birthDate = $('#birth-date'),
                contactNumber = $('#contact-number'),
                password = $('#password-field'),
                passwordConfirm = $('#confirm-password-field');

            $("#sign_up_form").on('submit', function (event) {
                event.preventDefault();

                var required = 5, snapshotElems = $(".snapshot"), input = $('<input/>');
                var snapshots = snapshotElems.length;

                input.attr('id', 'input-photo');
                input.attr('value', '');

                if (snapshots > 0 && snapshots <= 4) {
                    var remaining = required - snapshots;

                    input.attr('placeholder', integerToWords(remaining) + ' (' + remaining + ')'
                        + (remaining < required ? ' more' : '') + (remaining === 1 ? ' snapshot is' : ' snapshots are') + ' required.');

                    return displayFieldErrorMessage(input, '');
                }

                if (checkifEmpty(fullName) !== false) return;

                if (checkifEmpty(userName) !== false) return;

                if (checkifEmpty(address) !== false) return;

                if (checkifEmpty(birthDate) !== false) return;

                if (checkifEmpty(contactNumber) !== false) return;

                if (checkContactNumber(contactNumber) !== false) return;

                if (checkPassword(password, passwordConfirm) !== false) return;

                var photos = {};

                snapshotElems.each(function (i, obj) {
                    photos[fullName.val() + " " + (i + 1)] = obj.attributes.value.value;
                });

                var user = {
                    "photos": photos,
                    "name": fullName.val(),
                    "username": userName.val(),
                    "email": email.val(),
                    "address": address.val(),
                    "birth_date": birthDate.val(),
                    "contact_number": contactNumber.val(),
                    "password": passwordConfirm.val()
                }

                $.ajax({
                    type: "POST",
                    data: user,
                    url: "../api/signup",
                    dataType: "json",
                    success: function (data) {

                        if (!data.verified && data.error) {
                            return alert(data.message);
                        }

                        // user["id"] = data.user_id;
                        // delete user["password"];
                        // localStorage.setItem('user', JSON.stringify(user));
                        window.location.href = paths.scan;
                    }
                });
            });

            $('.modal').on('hidden.bs.modal', function () {
                cancel_preview();
            });

            $("#take-snapshot").click(function () {
                var div = $("<div id='block' class='d-flex align-items-center justify-content-center' style='z-index: 10000; background-color: rgb(0, 0, 0, 0.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0;'>"
                    + "<h4 class='text-white'>Getting Ready <span></span></h4>"
                    + "</div>");
                $('body').append(div);

                var counter = 3;
                var counterIntervalId = setInterval(function () {
                    $("#block h4 span").empty();
                    $("#block h4 span").append(counter);

                    counter--;
                }, 1000);

                setTimeout(function () {
                    $("#block").remove();
                    clearInterval(counterIntervalId);
                }, 3000);

                Webcam.set({
                    // live preview size
                    width: 470,
                    height: 400,

                    // device capture size
                    dest_width: 320,
                    dest_height: 240,

                    // final cropped size
                    crop_width: 320,
                    crop_height: 240,

                    // format and quality
                    image_format: 'jpeg',
                    jpeg_quality: 100,

                    // flip horizontal (mirror mode)
                    flip_horiz: true
                });
                Webcam.attach('#my_camera');
            });
        });

        Path.map("#/profile").to(function () {
            var currentUser = JSON.parse(localStorage.getItem('user'));

            $("#target").html("").append($.Mustache.render("profile", currentUser));

            if (currentUser == null) window.location.href = paths.login;

            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: currentUser["id"],
                width: 150,
                height: 150,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            $("#qr-download-btn").click(function () {
                $(this).hide();

                html2canvas(document.querySelector("#capture")).then(canvas => {
                    var image = canvas.toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");

                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function () {
                        var a = document.createElement('a');
                        a.href = window.URL.createObjectURL(xhr.response);
                        a.download = currentUser.name + '.png';
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    };
                    xhr.open('GET', image);
                    xhr.send();

                });

                setTimeout(function () {
                    $("#qr-download-btn").show();
                }, 1000);
            });

            var fullName = $('#full-name'),
                userName = $('#user-name'),
                email = $('#email-address'),
                address = $('#address'),
                birthDate = $('#birth-date'),
                contactNumber = $('#contact-number');

            fullName.val(currentUser.name);
            userName.val(currentUser.username);
            email.val(currentUser.email);
            address.val(currentUser.address);
            birthDate.val(currentUser.birth_date);
            contactNumber.val(currentUser.contact_number);

            $("#update_form").on('submit', function (event) {
                event.preventDefault();

                if (checkifEmpty(fullName) !== false) return;

                if (checkifEmpty(userName) !== false) return;

                if (checkifEmpty(address) !== false) return;

                if (checkifEmpty(birthDate) !== false) return;

                if (checkifEmpty(contactNumber) !== false) return;

                if (checkContactNumber(contactNumber) !== false) return;

                var user = {
                    "id": currentUser.id,
                    "name": fullName.val(),
                    "username": userName.val(),
                    "email": email.val(),
                    "address": address.val(),
                    "birth_date": birthDate.val(),
                    "contact_number": contactNumber.val(),
                }

                $.ajax({
                    type: "POST",
                    data: user,
                    url: "../api/update/" + currentUser.id,
                    dataType: "json",
                    success: function (data) {
                        if (!data.verified && data.error) {
                            return alert(data.message);
                        }

                        alert('Updated Successfully!');
                        localStorage.setItem('user', JSON.stringify(user));
                        window.location.href = paths.profile;
                    }
                });
            });

            $("#logout").click(function () {
                localStorage.removeItem("user");

                window.location.href = paths.login;
            });

            function slideToggle(t, e, o) { 0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o) } function slideUp(t, e, o) { j(t, e, o) } function slideDown(t, e, o) { j(t, e, o, !0) } function j(t, e, o, i) { void 0 === e && (e = 400), void 0 === i && (i = !1), t.style.overflow = "hidden", i && (t.style.display = "block"); var p, l = window.getComputedStyle(t), n = parseFloat(l.getPropertyValue("height")), a = parseFloat(l.getPropertyValue("padding-top")), s = parseFloat(l.getPropertyValue("padding-bottom")), r = parseFloat(l.getPropertyValue("margin-top")), d = parseFloat(l.getPropertyValue("margin-bottom")), g = n / e, y = a / e, m = s / e, u = r / e, h = d / e; window.requestAnimationFrame(function l(x) { void 0 === p && (p = x); var f = x - p; i ? (t.style.height = g * f + "px", t.style.paddingTop = y * f + "px", t.style.paddingBottom = m * f + "px", t.style.marginTop = u * f + "px", t.style.marginBottom = h * f + "px") : (t.style.height = n - g * f + "px", t.style.paddingTop = a - y * f + "px", t.style.paddingBottom = s - m * f + "px", t.style.marginTop = r - u * f + "px", t.style.marginBottom = d - h * f + "px"), f >= e ? (t.style.height = "", t.style.paddingTop = "", t.style.paddingBottom = "", t.style.marginTop = "", t.style.marginBottom = "", t.style.overflow = "", i || (t.style.display = "none"), "function" == typeof o && o()) : window.requestAnimationFrame(l) }) }

            let sidebarItems = document.querySelectorAll('.sidebar-item.has-sub');
            for (var i = 0; i < sidebarItems.length; i++) {
                let sidebarItem = sidebarItems[i];
                sidebarItems[i].querySelector('.sidebar-link').addEventListener('click', function (e) {
                    e.preventDefault();

                    let submenu = sidebarItem.querySelector('.submenu');
                    if (submenu.classList.contains('active')) submenu.style.display = "block"

                    if (submenu.style.display == "none") submenu.classList.add('active')
                    else submenu.classList.remove('active')
                    slideToggle(submenu, 300)
                })
            }

            window.addEventListener('DOMContentLoaded', (event) => {
                var w = window.innerWidth;
                if (w < 1200) {
                    document.getElementById('sidebar').classList.remove('active');
                }
            });
            window.addEventListener('resize', (event) => {
                var w = window.innerWidth;
                if (w < 1200) {
                    document.getElementById('sidebar').classList.remove('active');
                } else {
                    document.getElementById('sidebar').classList.add('active');
                }
            });

            document.querySelector('.burger-btn').addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('active');
            })
            document.querySelector('.sidebar-hide').addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('active');

            })

            // Perfect Scrollbar Init
            if (typeof PerfectScrollbar == 'function') {
                const container = document.querySelector(".sidebar-wrapper");
                const ps = new PerfectScrollbar(container, {
                    wheelPropagation: false
                });
            }

            // Scroll into active sidebar
            document.querySelector('.sidebar-item.active').scrollIntoView(false);

            $('.modal').on('hidden.bs.modal', function () {
                cancel_preview();

                // remove snapshot result
                $("#my_camera").attr("style", "");
                $("#my_camera").html("Loading...");
                $('#results').empty();
                $('#results').attr("style", "display: none;");
                $("#current_take_buttons").attr("style", "display: none");
            });

            $("#save-photo").click(function () {
                $("#post_take_buttons").attr("style", "display: none");
                $("#current_take_buttons").attr("style", "display: block");

                var photo = $("#input-photo").val();

                $.ajax({
                    type: "POST",
                    data: {
                        'id': currentUser.id,
                        'photo': photo
                    },
                    url: "../api/user/profile-picture/update",
                    dataType: "json",
                    success: function (data) {

                        if (!data.verified && data.error) {
                            return alert(data.message);
                        }

                        $('#profile-picture').attr('src', photo);
                        $('#qr-profile-picture').attr('src', photo);
                        currentUser["photo"] = photo;
                        localStorage.setItem('user', JSON.stringify(currentUser));
                    }
                });
            });

            $("#cancel-preview").click(function () {
                $("#my_camera").attr("style", "");
                $("#my_camera").html("Loading...");
                $("#edit-snapshot").trigger("click");
                $("#current_take_buttons").attr("style", "display: none");

                var div = $("<div id='block' class='d-flex align-items-center justify-content-center' style='z-index: 10000; background-color: rgb(0, 0, 0, 0.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0;'>"
                    + "<h4 class='text-white'><span>Please Wait...</span></h4>"
                    + "</div>");
                $('body').append(div);

                setTimeout(function () {
                    $("#block").remove();
                }, 3000);
            });

            $("#edit-snapshot").click(function () {
                var img = $("<img class='img-fluid img-thumbnail w-100'/>");

                img.attr("src", currentUser.photo);

                $("#my_camera").empty();
                $("#my_camera").append(img);
            });

            $("#take-snapshot").click(function () {
                var div = $("<div id='block' class='d-flex align-items-center justify-content-center' style='z-index: 10000; background-color: rgb(0, 0, 0, 0.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0;'>"
                    + "<h4 class='text-white'>Getting Ready <span></span></h4>"
                    + "</div>");
                $('body').append(div);

                $("#current_take_buttons").attr("style", "display: none");

                var counter = 3;
                var counterIntervalId = setInterval(function () {
                    $("#block h4 span").empty();
                    $("#block h4 span").append(counter);

                    counter--;
                }, 1000);

                setTimeout(function () {
                    $("#block").remove();
                    clearInterval(counterIntervalId);
                }, 3000);

                Webcam.set({
                    // live preview size
                    width: 470,
                    height: 400,

                    // device capture size
                    dest_width: 320,
                    dest_height: 240,

                    // final cropped size
                    crop_width: 320,
                    crop_height: 240,

                    // format and quality
                    image_format: 'jpeg',
                    jpeg_quality: 100,

                    // flip horizontal (mirror mode)
                    flip_horiz: true
                });

                Webcam.attach('#my_camera');
            });
        });

        Path.map("#/test").to(function () {
            var currentUser = JSON.parse(localStorage.getItem('user'));

            $("#target").html("").append($.Mustache.render("test"));

            const video = document.getElementById('video')
            const MODEL_URL = 'js/weights'

            Promise.all([
                faceapi.loadFaceLandmarkModel(MODEL_URL),
                faceapi.loadFaceRecognitionModel(MODEL_URL),
                faceapi.loadFaceExpressionModel(MODEL_URL),
                faceapi.loadTinyFaceDetectorModel(MODEL_URL)
            ]).then(startVideo);

            function startVideo() {
                navigator.getUserMedia(
                    { video: {} },
                    stream => video.srcObject = stream,
                    err => console.log(err)
                )
            }

            video.addEventListener('play', () => {
                const canvas = faceapi.createCanvasFromMedia(video)
                document.getElementById('video-container').append(canvas)
                $("#video-container canvas").attr('style', 'position: absolute; top: 0; bottom: 0; left: 0')
                const displaySize = { width: video.width, height: video.height }
                faceapi.matchDimensions(canvas, displaySize)
                let detections = null;

                setInterval(async () => {
                    detections = await faceapi.detectSingleFace(video,
                        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

                    if (!detections) return

                    const resizedDetections = faceapi.resizeResults(detections, displaySize)
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

                    faceapi.draw.drawDetections(canvas, resizedDetections)

                }, 100)
            })
        });

        Path.root("#/");

        Path.rescue(function () {
            alert('Page not found!');

            window.location.href = '#/login';
        });

        Path.listen();
    })
});
