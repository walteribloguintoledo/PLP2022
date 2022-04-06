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

                    var currentUser = JSON.parse(localStorage.getItem('userData'));
                    if (currentUser === null) window.location.replace("http://ernanie.com/Day3/mustache/#/login");
                });
            });

            $("#documernt").ready(function () {
                $("#signup").click(function (e) {
                    e.preventDefault();

                    var currentUser = JSON.parse(localStorage.getItem('userData'));
                    if (currentUser === null) window.location.replace("http://ernanie.com/Day3/mustache/#/signup");
                }); 0
            });
        });

        //signup
        Path.map("#/signup").to(function () {
            $("#target").html("").append($.Mustache.render("signup"));

            //current time and date
            var timeDate = new Date();

            //input ids
            var FirstName = $("#fname");
            var LastName = $("#lname");
            var UserName = $("#uname");
            var Email = $("#email");
            var Password = $("#password");
            var ConfirmPassword = $("#cpassword");
            var Birthdate = $("#birthdate");
            var Contact = $("#contact");

            var letters = /^[A-Za-z]+$/;//letters only

            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//valid email

            var numbers = /^[0-9]+$/;//numbers only

            var mixed = /^[0-9a-zA-Z]+$/ //letters and numbers

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
                    } else if (userNameTaken(UserName) !== false) {
                        $("#uname").focus();
                        return UserName.val('');
                    }
                    if ($("#email").val() == "") {
                        alert("Email is empty.");
                        $("#email").focus();
                        return false;
                    } else if (!$("#email").val().match(mailformat)) {
                        alert("Email is invalid.");
                        $("#email").focus();
                        return Email.val('');
                    } else if (emailTaken(Email) !== false) {
                        $("#email").focus();
                        return Email.val('');
                    }
                    if ($("#password").val() == "") {
                        alert("Password is empty.");
                        $("#password").focus();
                        return Password.val('');
                    } else if ($("#password").val().length < 6 || $("#cpassword").val().length > 12) {
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

            //username alredy exists
            function userNameTaken(inputData) {
                if (userInput === undefined) {
                    return false;
                }

                var userInfo = null;

                userInput.forEach(user => {
                    if (inputData.val() === user.username) {
                        userInfo = user;
                    }
                });

                if (userInfo !== null) {
                    alert('Please choose another username.');
                } else {
                    return false;
                }
            }

            //email alredy exists
            function emailTaken(inputData) {
                if (userInput === undefined) {
                    return false;
                }

                var userInfo = null;

                userInput.forEach(user => {
                    if (inputData.val() === user.email) {
                        userInfo = user;
                    }
                });

                if (userInfo !== null) {
                    alert('Please choose another email.');
                } else {
                    return false;
                }
            }

            //age function
            function getAge() {
                //get age using date
                var bday = new Date(Birthdate.val());
                if (Birthdate.val() == null || Birthdate.val() == '') {
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

            //save user array
            function registerUser() {

                // display
                // signup = "First name: " + FirstName.value + "<br>" + "Last Name: " + LastName.value + "<br>" + "Username: " + UserName.value + "<br>" + "Email: " + Email.value + "<br>" + "Password: " + Password.value + "<br>" + "Confirm Password: " + ConfirmPassword.value + "<br>" + "Birthdate: " + Birthdate.value + "<br>" + "Age: " + getAge() + "yrs old" + "<br>" + "Contact: " + Contact.value + "<br>" + "Time and Date: " + timeDate;

                // signup = searchUser();

                console.log("First name: " + FirstName.val());
                console.log("Last name: " + LastName.val());
                console.log("Username: " + UserName.val());
                console.log("Email: " + Email.val());
                console.log("Password: " + Password.val());
                console.log("Confirm Password: " + ConfirmPassword.val());
                console.log("Birthdate: " + Birthdate.val());
                console.log("Age: " + getAge() + "yrs old");
                console.log("Contact: " + Contact.val());
                console.log("Time and Date: " + timeDate);

                // local storage
                var userData = {
                    firstname: FirstName.val(),
                    lastname: LastName.val(),
                    username: UserName.val(),
                    email: Email.val(),
                    password: Password.val(),
                    confirm: ConfirmPassword.val(),
                    age: getAge() + "yrs old",
                    birthdate: Birthdate.val(),
                    contact: Contact.val(),
                    timendate: timeDate
                };

                localStorage.setItem('userData', JSON.stringify(userData));
                userInput.push(userData);
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

                var routeHome = "http://ernanie.com/Day3//mustache/#/blog";
                alert("Successfully Registered!");
                window.location.replace(routeHome);
            }

            //array of user input
            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array();
            var userInfo = null;
            console.log(userInput);

            var currentUser = JSON.parse(localStorage.getItem('userData'));
            if (currentUser !== null) {
                alert("You have already logged in.");
                window.location.replace("http://ernanie.com/Day3/mustache/#/blog");
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
                        if (item.username === username) {
                            var result = "";
                            result += "First name: " + item.firstname + "<br>";
                            result += "Last name: " + item.lastname + "<br>";
                            result += "Username: " + item.username + "<br>";
                            result += "Email: " + item.email + "<br>";
                            result += "Password: " + item.password + "<br>";
                            result += "Confirm Password: " + item.confirm + "<br>";
                            result += "Birthdate: " + item.birthdate + "<br>";
                            result += "Age: " + item.age + "<br>";
                            result += "Contact: " + item.contact + "<br>";
                            result += "Time and Date: " + item.timendate + "<br>";
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

            var currentUser = JSON.parse(localStorage.getItem('userData'));
            if (currentUser !== null) {
                alert("You have already logged in.");
                window.location.replace("http://ernanie.com/Day3/mustache/#/blog");
            }

            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array(), userInfo = null;
            console.log(userInput);

            $(document).ready(function () {
                $("#login").click(function (e) {
                    e.preventDefault();

                    var password = $("#password");
                    var username = $("#username");

                    if (checkifEmpty(username) !== false) return;

                    if (grantAccess(username, password) !== false) {
                        username.val('');
                        password.val('');
                        username.focus();

                        return;
                    }

                    localStorage.setItem('userData', JSON.stringify(userInfo));
                    alert("Welcome " + username.val());
                    window.location.replace("http://ernanie.com/Day3/mustache/#/blog");
                });
            });
        });

        //blog
        Path.map("#/blog").to(function () {
            $("#target").html("").append($.Mustache.render("blog"));

            var userInput = JSON.parse(localStorage.getItem('userInput')) ?? new Array();
            console.log(userInput);

            $("#documet").ready(function () {
                $("#logout").click(function (e) {
                    e.preventDefault();

                    var currentUser = JSON.parse(localStorage.getItem('userData'));

                    if (currentUser === null) {
                        alert("No current user detected.");
                        return false;
                    }
                    else {
                        localStorage.removeItem("userData");
                        alert("Logged out successfully.");
                        window.location.replace("http://ernanie.com/Day3/mustache/#/home");
                    }
                });
            });
        });

        Path.root("#/home");
        Path.listen();
    });

});