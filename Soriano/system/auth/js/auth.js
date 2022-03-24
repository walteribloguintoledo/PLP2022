$(document).ready(function () {
    $.Mustache.options.warnOnMissingTemplates = true;

    var paths = {
        "home": "#/home",
        "login": "#/login",
        "profile": "#/profile",
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

    $.Mustache.load("templates.html").done(function () {
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

                var photo = $("#input-photo");

                if (photo.length === 0) {
                    var input = $('<input/>');
                    input.attr('id', 'input-photo');
                    input.attr('placeholder', 'Snapshot');
                    input.attr('value', '');

                    if (checkifEmpty(input) !== false) return;
                }

                if (checkifEmpty(fullName) !== false) return;

                if (checkifEmpty(userName) !== false) return;

                if (checkifEmpty(address) !== false) return;

                if (checkifEmpty(birthDate) !== false) return;

                if (checkifEmpty(contactNumber) !== false) return;

                if (checkContactNumber(contactNumber) !== false) return;

                if (checkPassword(password, passwordConfirm) !== false) return;

                var user = {
                    "photo": photo.val(),
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

                        user["id"] = data.user_id;
                        delete user["password"];
                        localStorage.setItem('user', JSON.stringify(user));
                        window.location.href = paths.profile;
                    }
                })
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
                    height: 440,

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
                        a.download = currentUser.name+'.png';
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    };
                    xhr.open('GET', image);
                    xhr.send();

                });

                setTimeout(function(){
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

        Path.root("#/");

        Path.rescue(function () {
            alert('Page not found!');

            window.location.href = '#/login';
        });

        Path.listen();
    })
});
