$(document).ready(function () {
    $.Mustache.options.warnOnMissingTemplates = true;
    $.Mustache.load("template.html").done(function () {

        function clearPanel() {
            // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
        }

        //home
        Path.map("#/home").to(function () {
            $("#target").html("").append($.Mustache.render("home"));

            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array();
            console.log(userInput);

            $("#documernt").ready(function () {
                $("#login").click(function (e) {
                    e.preventDefault();

                    var currentUser = JSON.parse(localStorage.getItem('currentLogin'));
                    if (currentUser === null) window.location.replace("#/login");
                });
            });

            $("#documernt").ready(function () {
                $("#signup").click(function (e) {
                    e.preventDefault();

                    var currentUser = JSON.parse(localStorage.getItem('currentLogin'));
                    if (currentUser === null) window.location.replace("#/signup");
                }); 0
            });
        });

        //signup
        Path.map("#/signup").to(function () {
            $("#target").html("").append($.Mustache.render("signup"));

            //current time and date
            var timeDate = new Date();

            var letters = /^[A-Za-z]+$/;//letters only

            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//valid email

            var numbers = /^[0-9]+$/;//numbers only

            // var signup = null; //print users in div


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
                        registerUser();
                    }
                });
            });

            //empty input
            function isEmpty(text) {
                if (text === "") {
                    return true;
                } else {
                    return false;
                }
            }

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

            //array of user input
            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array();
            console.log(userInput);

            var currentUser = JSON.parse(localStorage.getItem('currentLogin'));
            if (currentUser !== null) {
                alert("You have already logged in.");
                window.location.replace("#/blog");
            }

            //save user array
            function registerUser() {

                // display
                // signup = "First name: " + FirstName.value + "<br>" + "Last Name: " + LastName.value + "<br>" + "Username: " + UserName.value + "<br>" + "Email: " + Email.value + "<br>" + "Password: " + Password.value + "<br>" + "Confirm Password: " + ConfirmPassword.value + "<br>" + "Birthdate: " + Birthdate.value + "<br>" + "Age: " + getAge() + "yrs old" + "<br>" + "Contact: " + Contact.value + "<br>" + "Time and Date: " + timeDate;

                // signup = searchUser();
                // local storage
                var currentLogin = {
                    firstname: $("#fname").val(),
                    lastname: $("#lname").val(),
                    username: $("#uname").val(),
                    email: $("#email").val(),
                    password: $("#password").val(),
                    confirm: $("#cpassword").val(),
                    age: getAge() + "yrs old",
                    birthdate: $("#birthdate").val(),
                    contact: $("#contact").val(),
                    timendate: timeDate
                };

                if (localStorage.getItem("currentLogin") != null) {
                    window.location.replace("#/blog");
                }

                $.ajax({
                    type: "POST",
                    url: "signup.php",
                    dataType: "json",
                    data: currentLogin,
                }).then(
                    function (response) {
                        if (response.userIsExist) {
                            alert("Please choose another username.");
                            $("#uname").val('');
                            $("#uname").focus();
                            return;
                        }
                        if (response.emailIsExist) {
                            alert("Please choose another email.");
                            $("#email").val('');
                            $("#email").focus();
                            return;
                        }
                        if (response.success == "2") {
                            console.log("First name: " + $("#fname").val());
                            console.log("Last name: " + $("#lname").val());
                            console.log("Username: " + $("#uname").val());
                            console.log("Email: " + $("#email").val());
                            console.log("Password: " + $("#password").val());
                            console.log("Confirm Password: " + $("#cpassword").val());
                            console.log("Birthdate: " + $("#birthdate").val());
                            console.log("Age: " + getAge() + "yrs old");
                            console.log("Contact: " + $("#contact").val());
                            console.log("Time and Date: " + timeDate);

                            localStorage.setItem('currentLogin', JSON.stringify(currentLogin));
                            userInput.push(currentLogin);
                            localStorage.setItem('userInput', JSON.stringify(userInput));
                            userInput = JSON.parse(localStorage.getItem('userInput'));
                            console.log(userInput);

                            $("#fname").val('');
                            $("#lname").val('');
                            $("#uname").val('');
                            $("#email").val('');
                            $("#password").val('');
                            $("#cpassword").val('');
                            $("#birthdate").val('');
                            $("#contact").val('');
                            $("#display").innerHTML = "";

                            alert("Successfully Registered!");
                            window.location.replace("#/login");
                        }
                    },
                    // reject/failure callback
                    function () {
                        alert("There was some error!");
                    }
                );

                // document.getElementById("display").innerHTML = searchUser();
            }

            //search fucntion
            $(document).ready(function () {
                $("#search").click(function (e) {
                    e.preventDefault();

                    var username = $("#uname").val();
                    var searchInput = JSON.parse(localStorage.getItem('userInput'));
                    console.log(searchInput);

                    $.each(searchInput, function (i, item) {
                        if (item.username === username) {
                            var result = "";
                            var fname = "First name: " + item.firstname + "<br>";
                            result += fname;
                            var lname = "Last name: " + item.lastname + "<br>";
                            result += lname
                            var uname = "Username: " + item.username + "<br>";
                            result += uname
                            var email = "Email: " + item.email + "<br>";
                            result += email
                            var password = "Password: " + item.password + "<br>";
                            result += password
                            var cpassword = "Confirm Password: " + item.confirm + "<br>";
                            result += cpassword
                            var birthday = "Birthdate: " + item.birthdate + "<br>";
                            result += birthday
                            var age = "Age: " + item.age + "<br>";
                            result += age
                            var contact = "Contact: " + item.contact + "<br>";
                            result += contact
                            var timendate = "Time and Date: " + item.timendate + "<br>";
                            result += timendate
                            document.getElementById("display").innerHTML = result;
                            console.log(result);
                        }
                        else {
                            alert("No such username");
                        }
                    });
                });
            });

        });

        //login
        Path.map("#/login").to(function () {
            $("#target").html("").append($.Mustache.render("login"));

            var currentUser = JSON.parse(localStorage.getItem('currentLogin'));
            if (currentUser !== null) {
                alert("You have already logged in.");
                window.location.replace("#/blog");
            }

            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array(), userInfo = null;
            console.log(userInput);
            function checkifEmpty(elem) {
                if (elem === "") {
                    return true;
                } else {
                    return false;
                }
            }

            $(document).ready(function () {
                $("#login").click(function (e) {
                    e.preventDefault();

                    var currentUser = [];
                    var username = $("#username").val();
                    var password = $("#password").val();
                    var currentLogin = {
                        Username: username,
                        Password: password,
                    };
                    currentUser.push(currentLogin);
                    $.ajax({
                        type: "POST",
                        url: "login.php",
                        data: currentLogin,
                        dataType: "json",
                    }).then(
                        function (response) {
                            if (response.isValid) {
                                alert("Welcome " + response.users["firstname"] + " " + response.users["lastname"]);
                                currentUser.push(response.Users);
                                localStorage.setItem("currentLogin", JSON.stringify(currentUser));
                                window.location.replace("#/blog");
                            } else {
                                alert("Credentials is incorrect");
                            }
                        },
                        function () {
                            alert("There was some error!");
                        }
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

        Path.map("#/users").to(function () {
            $("#target").html("").append($.Mustache.render("users"));

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

            //array of user input
            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array();
            var userInfo = null;
            console.log(userInput);

            var currentUser = JSON.parse(localStorage.getItem('currentLogin'));
            if (currentUser !== null) {
                alert("You have already logged in.");
                window.location.replace("#/blog");
            }

            //show users
            $.ajax({
                type: "GET",
                url: "view.php",
            }).then(
                function (response) {
                    response = $.parseJSON(response);
                    if (response.status == 'success') {
                        $('#table').html(response.html);
                    }
                },
                function () {
                    alert("There was some error!");
                }
            );

            //delete users
            $(document).on('click', '#btnDelete', function () {
                var DeleteID = $(this).attr('data-id2');
                $(document).on("click", '#deleteUser', function () {
                    $.ajax({
                        type: "POST",
                        url: "delete.php",
                        data: { del_Id: DeleteID },
                    }).then(
                        function (response) {
                            alert(response);
                            location.reload();
                        },
                        function () {
                            alert("There was some error!");
                        }
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
                var updateuname = $('#useruname');
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
                } if (isEmpty(updateuname)) {
                    alert("Username is empty.");
                    $("#useruname").focus();
                    return false;
                } else if ($("#useruname").val().length < 4 || $("#useruname").val().length > 10) {
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
                }

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
                    url: "update.php",
                    dataType: "json",
                    data: updateData,
                }).then(
                    function (response) {
                        if (response.emailExists) {
                            alert("Please choose another email.");
                            $("#useremail").val('');
                            $("#useremail").focus();
                            return;
                        }
                        else if (response.usernameExists) {
                            alert("Please choose another username.");
                            $("#useruname").val('');
                            $("#useruname").focus();
                            return;
                        }
                        else {
                            alert("Data updated successfully!");
                        }
                    },
                    // reject/failure callback
                    function () {
                        alert("There was some error!");
                    }
                );
            });

            //confirm update
            $(document).on('click', '#btnEdit', function () {
                var ID = $(this).attr('data-id');
                $.ajax({
                    url: "getData.php",
                    type: "GET",
                    data: { userID: ID },
                    dataType: "JSON",
                }).then(
                    function (response) {
                        $('#userID').val(response[0]);
                        $('#userfname').val(response[1]);
                        $('#userlname').val(response[2]);
                        $('#useruname').val(response[3]);
                        $('#useremail').val(response[4]);
                        $('#userpassword').val(response[5]);
                        $('#usercpassword').val(response[6]);
                        $('#userbirthdate').val(response[7]);
                        $('#usercontact').val(response[8]);
                    },
                    function () {
                        alert("There was some error!");
                    }
                )
            });
        });

        Path.root("#/home");
        Path.listen();
    });
});