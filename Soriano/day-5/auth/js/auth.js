$(document).ready(function () {
    $.Mustache.options.warnOnMissingTemplates = true;

    var paths = {
            "home": "#/home",
            "login": "#/login",
        };

    function removeWhiteSpace(value) { return value.replace(/\s/g, ""); }

    function checkifEmpty(elem) {
        return removeWhiteSpace(elem.val()) === "" ? alert(elem.attr("id") + " is required.") : false;
    }

    function checkContactNumber(elem) {
        var size = 11;

        return elem.val().length < size ? alert(elem.attr("id") + " must be " + size + " digits.") : false;
    }

    function checkPassword(elem, elemConfirm) {
        var size = 8;
        if (elem.val().length < 8) return alert(elem.attr("id") + " must be " + size + " characters.");

        if (elem.val() !== elemConfirm.val()) return alert("Password doesn't match");

        return false;
    }

    $.Mustache.load("templates.html").done(function () {
        Path.map("#/login").to(function () {
            $("#target").html("").append($.Mustache.render("login"));

            var currentUser = JSON.parse(localStorage.getItem('user'));

            if (currentUser !== null) window.location.href = paths.home;

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
                        if (data.error) {
                            return alert(JSON.stringify(data.error.msg));
                        }

                        localStorage.setItem('user', JSON.stringify(data));
                        window.location.href = paths.home;
                    }
                });
            });
        });

        Path.map("#/signup").to(function () {
            $("#target").html("").append($.Mustache.render("signup"));

            var currentUser = JSON.parse(localStorage.getItem('user'));

            if (currentUser !== null) window.location.href = paths.home;

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
                        if (data.verified == 0) {
                            return alert('error');
                        }

                        // if (data.error) {
                        //     return alert(JSON.stringify(data.error.msg));
                        // }

                        // user = (({ name, email, username, address, birth_date, contact_number }) => ({ name, email, username, address, birth_date, contact_number }))(user);
                        // user["id"] = data.result.id;
                        localStorage.setItem('user', JSON.stringify(user));
                        window.location.href = paths.home;
                    }
                })
            });
        });

        Path.map("#/home").to(function () {
            $("#target").html("").append($.Mustache.render("home"));

            var currentUser = JSON.parse(localStorage.getItem('user'));

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
                
                $.ajax({
                    type: "POST",
                    data: {
                        "id": currentUser.id,
                        "name": fullName.val(),
                        "username": userName.val(),
                        "email": email.val(),
                        "address": address.val(),
                        "birth_date": birthDate.val(),
                        "contact_number": contactNumber.val(),
                    },
                    url: "controller/User.php?action=update",
                    dataType: "json",
                    success: function (data) {
                        if (data.error) {
                            // window.location.href = paths.home;
                            return alert(JSON.stringify(data.error.msg));
                        }

                        alert('Updated Successfully!');
                        localStorage.setItem('user', JSON.stringify(data));
                    }
                });
            });

            $("#logout").click(function () {
                localStorage.removeItem("user");
        
                window.location.href = paths.login;
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
