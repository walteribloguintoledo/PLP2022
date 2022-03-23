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
            $("#target").html("").append($.Mustache.render("login"));

            var currentUser = JSON.parse(localStorage.getItem('user'));

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

                if (checkifEmpty(fullName) !== false) return;

                if (checkifEmpty(userName) !== false) return;

                if (checkifEmpty(address) !== false) return;

                if (checkifEmpty(birthDate) !== false) return;

                if (checkifEmpty(contactNumber) !== false) return;

                if (checkContactNumber(contactNumber) !== false) return;

                if (checkPassword(password, passwordConfirm) !== false) return;

                var user = {
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

            $("#take-snapshot").click(function () {
                Webcam.set({
                    // live preview size
                    width: 320,
                    height: 240,
    
                    // device capture size
                    dest_width: 640,
                    dest_height: 480,
    
                    // final cropped size
                    crop_width: 480,
                    crop_height: 480,
    
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
            $("#target").html("").append($.Mustache.render("profile"));

            var currentUser = JSON.parse(localStorage.getItem('user'));

            if ("photo" in currentUser && currentUser["photo"] !== null) {
                $("div#display-profile-picture").removeClass("d-none");

                $("img#profile-picture").attr('src', currentUser["photo"]["secure_url"]);
            } else {
                $("div#upload-profile-picture-submit").removeClass("d-none");
            }

            if (currentUser == null) window.location.href = paths.login;

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

            // FilePond
            $.fn.filepond.registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

            $('.my-pond').filepond();
            $('.my-pond').filepond('allowMultiple', false);
            $('.my-pond').filepond('acceptedFileTypes', ["image/jpeg", "image/png"]);

            var file = null,
                profilePictureSubmitElem = $("#profile-picture-submit"),
                profilePictureResetElem = $("#profile-picture-reset"),
                profilePictureDeleteElem = $("#profile-picture-delete"),
                cloudinaryUrl = "https://api.cloudinary.com/v1_1/ds2znjplk";

            const cloudinaryUploadPreset = "ml_default";

            function toggleFilePondButtons(file) {
                if (file) {
                    profilePictureSubmitElem.attr('disabled', false);
                    profilePictureResetElem.removeClass("d-none");
                } else {
                    profilePictureSubmitElem.attr('disabled', true);
                    profilePictureResetElem.addClass("d-none");
                }
            }

            $('.my-pond').on('FilePond:addfile', function (e) {
                file = e.detail.file.file;

                toggleFilePondButtons(file);

                if (!profilePictureResetElem.hasClass("d-none")) {
                    profilePictureResetElem.click(function () {
                        let filePond = FilePond.find(document.getElementById("my-pond"));
                        if (filePond != null) {
                            filePond.removeFiles();
                            file = null;
                            toggleFilePondButtons(file);
                        }
                    });
                }
            });

            profilePictureSubmitElem.click(function (e) {
                e.preventDefault();

                toggleFilePondButtons(null);

                var url = cloudinaryUrl + "/upload";
                var formData = new FormData();

                formData.append('file', file);
                formData.append('folder', 'system');
                formData.append('upload_preset', cloudinaryUploadPreset);

                $.ajax({
                    xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        var progress = $("#filepond-progress-submit");

                        if (progress.hasClass("d-none")) progress.removeClass("d-none");

                        xhr.upload.addEventListener("progress", function (evt) {
                            function setValue(value) {
                                var progressBar = $("#filepond-progress-submit .progress-bar");

                                progressBar.attr('value', value);
                                progressBar.css({ 'width': value + "%" });
                                progressBar.html(value + "%");
                            }

                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                var percentage = Math.round(percentComplete * 100);

                                setValue(percentage);

                                if (percentage >= 100) setTimeout(function () {
                                    setValue(0);
                                    progress.addClass("d-none");
                                }, 2000);
                            }
                        }, false);

                        return xhr;
                    },
                    method: 'post',
                    processData: false,
                    contentType: false,
                    cache: false,
                    data: formData,
                    enctype: 'multipart/form-data',
                    url: url,
                    success: function (data) {
                        $.ajax({
                            type: "POST",
                            data: {
                                'id': currentUser.id,
                                'photo': data
                            },
                            url: "../api/user/profile-picture/update",
                            dataType: "json"
                        });

                        currentUser["photo"] = data;
                        localStorage.setItem('user', JSON.stringify(currentUser));
                        location.reload();
                    }
                });
            });

            profilePictureDeleteElem.click(function (e) {
                e.preventDefault();
                var deleteToken = currentUser["photo"]["delete_token"];
                const cloudinaryUrl = "https://api.cloudinary.com/v1_1/ds2znjplk/delete_by_token";

                $.ajax({
                    url: cloudinaryUrl,
                    method: "POST",
                    data: { token: deleteToken },
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                    }
                });
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
