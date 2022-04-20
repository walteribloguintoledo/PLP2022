$(document).ready(function () {
    $.Mustache.options.warnOnMissingTemplates = true;
    $.Mustache.load("./app/app.html").done(function () {

        function clearPanel() {
            // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
        }

        //home
        Path.map("#/home").to(function () {
            $("#target").html("").append($.Mustache.render("home"));

            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array();
            console.log(userInput);

            $(document).ready(function () {
                $("#login").click(function (e) {
                    e.preventDefault();

                    var currentLogin = JSON.parse(localStorage.getItem('currentLogin'));
                    if (currentLogin !== null) {
                        alert("Your already logged in.")
                        window.location.replace("#/blog");
                    }
                    else if (currentLogin === null) window.location.replace("#/login");
                });
            });

            $(document).ready(function () {
                $("#signup").click(function (e) {
                    e.preventDefault();

                    var currentLogin = JSON.parse(localStorage.getItem('currentLogin'));
                    if (currentLogin !== null) {
                        alert("Your already logged in.")
                        window.location.replace("#/blog");
                    }
                    else if (currentLogin === null) window.location.replace("#/signup");
                });
            });
        });

        //signup
        Path.map("#/signup").to(function () {
            $("#target").html("").append($.Mustache.render("signup"));

            var letters = /^[A-Za-z]+$/;//letters only

            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//valid email

            var numbers = /^[0-9]+$/;//numbers only

            // var signup = null; //print users in div

            //array of user input
            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array();
            console.log(userInput);

            //validations
            $(document).ready(function () {
                $("#print").click(function (e) {
                    e.preventDefault();

                    if ($("#fname").val() == "") {
                        alert("Firstname is empty.");
                        $("#fname").focus();
                        return false;
                    } else if (!$("#fname").val().match(letters)) {
                        alert("Firstname should be letters only.");
                        $("#fname").focus();
                        return FirstName.val('');
                    }
                    if ($("#lname").val() == "") {
                        alert("Lastname is empty.");
                        $("#lname").focus();
                        return false;
                    } else if (!$("#lname").val().match(letters)) {
                        alert("Lastname should be letters only.");
                        $("lfname").focus();
                        return LastName.val('');
                    } else if ($("#uname").val().length < 4 || $("#uname").val().length > 10) {
                        alert("Username must be 4 character to 10 characters long.");
                        $("#uname").focus();
                        return false;
                    }
                    if ($("#email").val() == "") {
                        alert("Email is empty.");
                        $("#email").focus();
                        return false;
                    } else if (!$("#email").val().match(mailformat)) {
                        alert("Email is invalid.");
                        $("#email").focus();
                        return Email.val('');
                    }
                    if ($("#password").val() == "") {
                        alert("Password is empty.");
                        $("#password").focus();
                        return Password.val('');
                    } else if ($("#password").val().length < 6 || $("#password").val().length > 12) {
                        alert("Password must be 6 character to 12 characters long.");
                        $("#password").focus();
                        return Password.val('');
                    }
                    if ($("#cpassword").val() == "") {
                        alert("Confirm Password is empty.");
                        $("#cpassword").focus();
                        return ConfirmPassword.val('');
                    } else if ($("#password").val() != $("#cpassword").val()) {
                        alert("Password does not match.");
                        $("#cpassword").focus();
                        return ConfirmPassword.val('');
                    }
                    if ($("#birthdate").val() == "") {
                        alert("Birthdate is empty.");
                        $("#birthdate").focus();
                        return Birthdate.val('');
                    }
                    if ($("#contact").val() == "") {
                        alert("Contact is empty.");
                        $("#contact").focus();
                        return Contact.val('');
                    } else if (!$("#contact").val().match(numbers)) {
                        alert("Contact is invalid.");
                        $("#contact").focus();
                        return Contact.val('');
                    }
                    else {
                        var currentLogin = {
                            Firstname: $("#fname").val(),
                            Lastname: $("#lname").val(),
                            Username: $("#uname").val(),
                            Email: $("#email").val(),
                            Password: $("#password").val(),
                            Age: getAge() + "yrs old",
                            Birthdate: $("#birthdate").val(),
                            Contact: $("#contact").val()
                        };

                        $.ajax({
                            type: "POST",
                            url: "./api/signup",
                            dataType: "json",
                            data: currentLogin,
                        }).then(
                            function (response) {
                                if (response.success == 0) {
                                    alert("Username already in use!");
                                    $("#uname").focus();
                                }
                                if (response.success == 1) {
                                    alert("Email already in use!");
                                    $("#email").focus();
                                }
                                if (response.success == 2) {
                                    console.log("First name: " + $("#fname").val());
                                    console.log("Last name: " + $("#lname").val());
                                    console.log("Username: " + $("#uname").val());
                                    console.log("Email: " + $("#email").val());
                                    console.log("Password: " + $("#password").val());
                                    console.log("Confirm Password: " + $("#cpassword").val());
                                    console.log("Birthdate: " + $("#birthdate").val());
                                    console.log("Age: " + getAge() + "yrs old");
                                    console.log("Contact: " + $("#contact").val());

                                    $.getJSON('./api/view', function (response) {
                                        if (response.status == 'success') {
                                            localStorage.setItem("allUsersData", JSON.stringify(response.html));
                                        }
                                    });

                                    userInput.push(currentLogin);
                                    localStorage.setItem('userInput', JSON.stringify(userInput));
                                    userInput = JSON.parse(localStorage.getItem('userInput'));
                                    console.log(userInput);
                                    alert("Successfully Registered!");
                                    window.location.replace("#/login");
                                }

                            },
                        );
                    }
                });
            });

            //age function
            function getAge() {
                //get age using date
                var bday = new Date($("#birthdate").val());
                if ($("#birthdate").val() == null || $("#birthdate").val() == '') {
                    return false;
                } else {

                    //milliseconds since jan 1, 1970 up to current date minus milliseconds from jan 1, 1970 to date given
                    var monthDifference = Date.now() - bday.getTime();

                    //converts the calculated difference in date format 
                    var newDate = new Date(monthDifference);

                    //get year from date
                    var getYear = newDate.getUTCFullYear();

                    //now calculate the absoltue value of age
                    var Age = Math.abs(getYear - 1970);

                    return Age;
                }
            }

            //search fucntion
            $(document).ready(function () {
                $("#search").click(function (e) {
                    e.preventDefault();

                    var username = $("#uname").val();
                    var searchInput = JSON.parse(localStorage.getItem('userInput'));
                    console.log(searchInput);
                    var counter = 0;

                    $.each(searchInput, function (i, item) {
                        if (item.Username === username) {
                            var result = "";
                            result += "First name: " + item.Firstname + "<br>";
                            result += "Last name: " + item.Lastname + "<br>";
                            result += "Username: " + item.Username + "<br>";
                            result += "Email: " + item.Email + "<br>";
                            result += "Password: " + item.Password + "<br>";
                            result += "Confirm Password: " + item.Confirm + "<br>";
                            result += "Birthdate: " + item.Birthdate + "<br>";
                            result += "Age: " + item.Age + "<br>";
                            result += "Contact: " + item.Contact + "<br>";
                            $("#display").append(result);
                            console.log(result);
                            counter = 1;
                        }
                    });

                    if (counter == 0) {
                        alert("No such username.");
                    }
                });
            });
        });

        //login
        Path.map("#/login").to(function () {
            $("#target").html("").append($.Mustache.render("login"));

            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array(), userInfo = null;
            console.log(userInput);

            $(document).ready(function () {
                $("#login").click(function (e) {
                    e.preventDefault();

                    var username = $("#username").val();
                    var password = $("#password").val();
                    var currentLogin = {
                        Username: username,
                        Password: password,
                    };
                    $.ajax({
                        type: "POST",
                        url: "./api/login",
                        data: currentLogin,
                        dataType: "json",
                    }).then(
                        function (response) {
                            if (response.success == 1) {
                                alert("Welcome " + response.users["firstname"] + " " + response.users["lastname"]);
                                localStorage.setItem('currentLogin', JSON.stringify(currentLogin));
                                window.location.replace("#/blog");
                            } else {
                                alert("Invalid credentials!");
                                $("#username").val('');
                                $("#password").val('');
                            }
                        },
                    );
                });
            });
        });

        //blog
        Path.map("#/blog").to(function () {
            $("#target").html("").append($.Mustache.render("blog"));

            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array();
            console.log(userInput);

            $("#document").ready(function () {
                $("#logout").click(function (e) {
                    e.preventDefault();

                    var currentUser = JSON.parse(localStorage.getItem('currentLogin'));

                    if (currentUser === null) {
                        alert("No current user detected.");
                        return false;
                    }
                    else {
                        localStorage.removeItem("currentLogin");
                        alert("Logged out successfully.");
                        window.location.replace("#/home");
                    }
                });
            });
        });

        //users
        Path.map("#/users").to(function () {

            var letters = /^[A-Za-z]+$/;//letters only

            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//valid email

            var numbers = /^[0-9]+$/;//numbers only


            function isEmpty(text) {
                if (text === "") {
                    return true;
                } else {
                    return false;
                }
            }

            var allUsersData = JSON.parse(localStorage.getItem('allUsersData'));
            var data = [];
            $.each(allUsersData, function (index, item) {
                var html = {
                    id: item.id,
                    firstname: item.firstname,
                    lastname: item.lastname,
                    username: item.username,
                    email: item.email,
                    password: item.password,
                    age: item.age,
                    birthdate: item.birthdate,
                    contact: item.contact
                }
                data.push(html);
            });
            var templateData = {
                users: data
            }
            console.log(templateData);

            //show users
            $.getJSON('./api/view', function (response) {
                if (response.status == 'success') {
                    localStorage.setItem("allUsersData", JSON.stringify(response.html));
                }
            });

            $("#target").html("").append($.Mustache.render("users", templateData));

            //delete users
            $(document).on('click', '#btnDelete', function () {
                var currentUser = JSON.parse(localStorage.getItem('allUsersData'));

                var DeleteID = $(this).attr('data-id2');
                $(document).on("click", '#deleteUser', function () {
                    $.ajax({
                        type: "POST",
                        url: "./api/delete",
                        data: { ID: DeleteID },
                    }).then(
                        function (response) {
                            $.getJSON('./api/view', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allUsersData", JSON.stringify(response.html));
                                    window.location.reload();
                                }
                            });
                            if (currentUser.length == 1) {
                                localStorage.removeItem("allUsersData");
                                alert(response);
                                window.location.reload();
                            }
                            else if (currentUser.length > 1) {
                                alert(response);
                                window.location.reload();
                            }
                        },
                    );
                })
            })

            //update user
            $(document).on('click', '#updateUser', function () {

                function getAge() {
                    //get age using date
                    var bday = new Date($("#userbirthdate").val());
                    if ($("#userbirthdate").val() == null || $("#userbirthdate").val() == '') {
                        return false;
                    } else {

                        //milliseconds since jan 1, 1970 up to current date minus milliseconds from jan 1, 1970 to date given
                        var monthDifference = Date.now() - bday.getTime();

                        //converts the calculated difference in date format 
                        var newDate = new Date(monthDifference);

                        //get year from date
                        var getYear = newDate.getUTCFullYear();

                        //now calculate the absoltue value of age
                        var Age = Math.abs(getYear - 1970);

                        return Age;
                    }
                }

                var updatefname = $('#userfname');
                var updatelname = $('#userlname');
                var updateemail = $('#useremail');
                var updatepassword = $("userpassword");
                var updatecpassword = $("usercpassword");
                var updatebirthdate = $("userbirthdate");
                var updatecontact = $('#usercontact');

                if (isEmpty(updatefname)) {
                    alert("Firstname is empty.");
                    $("#userfname").focus();
                    return false;
                } else if (!$("#userfname").val().match(letters)) {
                    alert("Firstname should be letters only.");
                    $("#userfname").focus();
                    return updatefname.val('');
                }
                if (isEmpty(updatelname)) {
                    alert("Lastname is empty.");
                    $("#userlname").focus();
                    return false;
                } else if (!$("#userlname").val().match(letters)) {
                    alert("Lastname should be letters only.");
                    $("lfname").focus();
                    return updatelname.val('');
                }
                else if ($("#useruname").val().length < 4 || $("#useruname").val().length > 10) {
                    alert("Username must be 4 character to 10 characters long.");
                    $("#useruname").focus();
                    return false;
                }
                if (isEmpty(updateemail)) {
                    alert("Email is empty.");
                    $("#useremail").focus();
                    return false;
                } else if (!$("#useremail").val().match(mailformat)) {
                    alert("Email is invalid.");
                    $("#useremail").focus();
                    return updateemail.val('');
                }
                if (isEmpty(updatepassword)) {
                    alert("Password is empty.");
                    $("#userpassword").focus();
                    return updatepassword.val('');
                } else if ($("#userpassword").val().length < 6 || $("#userpassword").val().length > 12) {
                    alert("Password must be 6 character to 12 characters long.");
                    $("#userpassword").focus();
                    return updatepassword.val('');
                }
                if (isEmpty(updatecpassword)) {
                    alert("Confirm Password is empty.");
                    $("#usercpassword").focus();
                    return updatecpassword.val('');
                } else if ($("#userpassword").val() != $("#usercpassword").val()) {
                    alert("Password does not match.");
                    $("#usercpassword").focus();
                    return updatecpassword.val('');
                }
                if ($("#userbirthdate") == "") {
                    alert("Birthdate is empty.");
                    $("#userbirthdate").focus();
                    return updatebirthdate.val('');
                }
                if (isEmpty(updatecontact)) {
                    alert("Contact is empty.");
                    $("#usercontact").focus();
                    return updatecontact.val('');
                } else if (!$("#usercontact").val().match(numbers)) {
                    alert("Contact is invalid.");
                    $("#usercontact").focus();
                    return updatecontact.val('');
                } else {
                    var updateData = {
                        UID: $("#userID").val(),
                        UFirst: $("#userfname").val(),
                        ULast: $("#userlname").val(),
                        UUsername: $("#useruname").val(),
                        UEmail: $("#useremail").val(),
                        UPassword: $("#userpassword").val(),
                        UAge: getAge(),
                        UBirthdate: $("#userbirthdate").val(),
                        UContact: $("#usercontact").val(),
                    };

                    $.ajax({
                        type: "POST",
                        url: "./api/update",
                        dataType: "json",
                        data: updateData,
                    }).then(
                        function (response) {
                            if (response.success == 1) {
                                window.location.reload();
                                $.getJSON('./api/view', function (response) {
                                    if (response.status == 'success') {
                                        localStorage.setItem("allUsersData", JSON.stringify(response.html));
                                    }
                                });
                                window.location.reload();
                                alert("Data updated successfully!");
                            }
                            if (response.success == 0) {
                                alert("Please choose another email.");
                                $("#useremail").focus();

                            }
                        },
                    );
                }
            });


            //confirm update
            $(document).on('click', '#btnEdit', function () {
                var ID = $(this).attr('data-id');
                $.getJSON("./api/getData?userID=" + ID, function (response) {
                    $("#userID").val(response.id);
                    $("#userfname").val(response.firstname);
                    $("#userlname").val(response.lastname);
                    $("#useruname").val(response.username);
                    $("#useremail").val(response.email);
                    $("#userpassword").val(response.password);
                    $("#usercpassword").val(response.password);
                    $("#userbirthdate").val(response.birthdate);
                    $("#usercontact").val(response.contact);
                });
            });
        });

        Path.root("#/home");
        Path.listen();
    });
});