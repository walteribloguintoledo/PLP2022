$(document).ready(function () {
    var App = {
        canvas: $("#target"),
        navbar: $("#navbar"),
        menubar: $("#sidemenu")
    }

    $.Mustache.options.warnOnMissingTemplates = true;
    $.Mustache.load("./app/app.html").done(function () {

        // admin side
        Path.map("#/adminSide").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));

            //show questions
            var allQuestions = JSON.parse(localStorage.getItem('allQuestions'));
            console.log(allQuestions);
            var data = [];
            $.each(allQuestions, function (index, item) {
                var html = {
                    id: item.id,
                    question: item.question,
                    choice1: item.choice1,
                    choice2: item.choice2,
                    choice3: item.choice3,
                    choice4: item.choice4,
                    answer: item.answer,
                    category: item.category,
                    subject: item.subject,
                    level: item.level
                }
                data.push(html);
            });
            var templateData = {
                questions: data
            }
            console.log(templateData);

            $.getJSON('./api/view', function (response) {
                if (response.status == 'success') {
                    localStorage.setItem("allQuestions", JSON.stringify(response.html));
                }
            });

            App.canvas.html("").append($.Mustache.render("adminSide", templateData));

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            if (currentUser === null) {
                alert("Please login first!");
                window.location.replace("#/login");
                window.location.reload();
            }

            $("#logout").click(function (e) {
                e.preventDefault();

                var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

                if (currentUser === null) {
                    alert("No current user detected.");
                    return false;
                }
                else {
                    localStorage.removeItem("adminLogin");
                    alert("Logged out successfully.");
                    window.location.replace("#/home");
                    window.location.reload();
                }
            });

            $(document).on('click', '#btnDelete', function () {
                var currentUser = JSON.parse(localStorage.getItem('allQuestions'));

                var DeleteID = $(this).attr('data-id2');
                $(document).on("click", '#deleteQuestion', function () {
                    $.ajax({
                        type: "POST",
                        url: "./api/delete",
                        data: { ID: DeleteID },
                    }).then(
                        function (response) {
                            $.getJSON('./api/view', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allQuestions", JSON.stringify(response.html));
                                    window.location.reload();
                                }
                            });
                            if (currentUser.length == 1) {
                                localStorage.removeItem("allQuestions");
                                alert(response);
                                window.location.reload();
                            }
                            else if (currentUser.length > 1) {
                                alert(response);
                                window.location.reload();
                            }
                        },
                    );
                });
            });

            $(document).on('click', '#btnEdit', function () {

                var ID = $(this).attr('data-id');
                $.getJSON("./api/getData?userID=" + ID, function (response) {
                    $("#updateID").val(response.id);
                    $("#updateQuestionnaire").val(response.question);
                    $("#updateChoice1").val(response.choice1);
                    $("#updateChoice2").val(response.choice2);
                    $("#updateChoice3").val(response.choice3);
                    $("#updateChoice4").val(response.choice4);
                    $("#updateAnswer").val(response.answer);
                    $("#updateLevel").val(response.level);
                });
            });
        });

        //add
        Path.map("#/addQuestion").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));
            App.canvas.html("").append($.Mustache.render("addQuestion"));

            $("#back").click(function (e) {
                e.preventDefault();
                window.location.replace("#/adminSide");
            });

            //get subject
            $.getJSON('./api/json/category.json', function (data) {

                $("#category").change(function () {
                    alert($("#category option:selected").val());
                    $.each(data, function (index, Category) {
                        if ($("#category option:selected").val() == "Hardware") {
                            $('#subject').html('<option value="--Select--">--Select--</option>');
                            $('#subject').append('<option value="' + Category.Hardware.Printer + '">' + Category.Hardware.Printer + '</option>' + '<option value="' + Category.Hardware.Networking + '">' + Category.Hardware.Networking + '</option>');
                        }
                        if ($("#category option:selected").val() == "Programming") {
                            $('#subject').html('<option value="--Select--">--Select--</option>');
                            $('#subject').append('<option value="' + Category.Programming.JQuery + '">' + Category.Programming.JQuery + '</option>' + '<option value="' + Category.Programming.PHP + '">' + Category.Programming.PHP + '</option>' + '</option>' + '<option value="' + Category.Programming.MySQL + '">' + Category.Programming.MySQL + '</option>' + '</option>' + '<option value="' + Category.Programming.Java + '">' + Category.Programming.Java + '</option>');
                        }
                    });
                });
            });

            //add question
            $(document).on('click', '#addQuestion', function () {
                var newQuestion = {
                    Question: $("#question").val(),
                    Choice1: $("#choice1").val(),
                    Choice2: $("#choice2").val(),
                    Choice3: $("#choice3").val(),
                    Choice4: $("#choice4").val(),
                    Answer: $("#answer").val(),
                    Category: $("#category").val(),
                    Subject: $("#subject").val(),
                    Level: $("#level").val()
                };

                $.ajax({
                    type: "POST",
                    url: "./api/add",
                    dataType: "json",
                    data: newQuestion,
                }).then(
                    function (response) {
                        if (response.success == 0) {
                            alert("Question already in use!");
                            $("#question").focus();
                        }
                        if (response.success == 1) {
                            $.getJSON('./api/view', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allQuestions", JSON.stringify(response.html));
                                }
                            });
                            alert("Question Added!");
                            window.location.reload();
                        }
                    },
                );
            });
        });

        //edit
        Path.map("#/editQuestion").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));
            App.canvas.html("").append($.Mustache.render("editQuestion"));

            $("#updateback").click(function (e) {
                e.preventDefault();
                window.location.replace("#/adminSide");
            });

            $.getJSON('./api/json/category.json', function (data) {
                $("#updateCategory").change(function () {
                    $.each(data, function (index, Category) {
                        if ($("#updateCategory option:selected").val() == "Hardware") {
                            $('#updateSubject').html('<option value="--Select--">--Select--</option>');
                            $('#updateSubject').append('<option value="' + Category.Hardware.Printer + '">' + Category.Hardware.Printer + '</option>' + '<option value="' + Category.Hardware.Networking + '">' + Category.Hardware.Networking + '</option>');
                        }
                        if ($("#updateCategory option:selected").val() == "Programming") {
                            $('#updateSubject').html('<option value="--Select--">--Select--</option>');
                            $('#updateSubject').append('<option value="' + Category.Programming.JQuery + '">' + Category.Programming.JQuery + '</option>' + '<option value="' + Category.Programming.PHP + '">' + Category.Programming.PHP + '</option>' + '</option>' + '<option value="' + Category.Programming.MySQL + '">' + Category.Programming.MySQL + '</option>' + '</option>' + '<option value="' + Category.Programming.Java + '">' + Category.Programming.Java + '</option>');
                        }
                    });
                });
            });

            $(document).on('click', '#updateQuestion', function () {

                var updateQuestionnaire = $('#updateQuestionnaire');
                var updateChoice1 = $('#updateChoice1');
                var updateChoice2 = $('#updateChoice2');
                var updateChoice3 = $('#updateChoice3');
                var updateChoice4 = $('#updateChoice4');
                var updateAnswer = $('#updateAnswer');
                var updateCategory = $('#updateCategory');
                var updateSubject = $("updateSubject");
                var updateLevel = $("updateLevel");

                var updateQuestion = {
                    UID: $("#updateID").val(),
                    QQuestion: $("#updateQuestionnaire").val(),
                    QChoice1: $("#updateChoice1").val(),
                    QChoice2: $("#updateChoice2").val(),
                    QChoice3: $("#updateChoice3").val(),
                    QChoice4: $("#updateChoice4").val(),
                    QAnswer: $("#updateAnswer").val(),
                    QCategory: $("#updateCategory").val(),
                    QSubject: $("#updateSubject").val(),
                    QLevel: $("#updateLevel").val()
                };

                $.ajax({
                    type: "POST",
                    url: "./api/update",
                    dataType: "json",
                    data: updateQuestion,
                }).then(
                    function (response) {
                        if (response.success == 1) {
                            window.location.reload();
                            $.getJSON('./api/view', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allQuestions", JSON.stringify(response.html));
                                }
                            });
                            window.location.reload();
                            alert("Data updated successfully!");
                        }
                        if (response.success == 0) {
                            alert("Please choose another question.");
                            $("#updateQuestionnaire").focus();

                        }
                    },
                );
            });
        });

        // user information
        Path.map("#/userInformation").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));

            var examineesData = JSON.parse(localStorage.getItem('examineesData'));
            console.log(examineesData);
            var data = [];
            $.each(examineesData, function (index, item) {
                var html = {
                    id: item.id,
                    firstname: item.firstname,
                    lastname: item.lastname,
                    email: item.email,
                    birthdate: item.birthdate,
                    contact: item.contact
                }
                data.push(html);
            });
            var templateData = {
                userInformation: data
            }
            console.log(templateData);

            $.getJSON('./api/viewUser', function (response) {
                if (response.status == 'success') {
                    localStorage.setItem("examineesData", JSON.stringify(response.html));
                }
            });

            App.canvas.html("").append($.Mustache.render("userInformation", templateData));

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            if (currentUser === null) {
                alert("Please login first!");
                window.location.replace("#/login");
                window.location.reload();
            }
        });


        Path.map("#/login").to(function () {
            App.canvas.html("").append($.Mustache.render("login"));

            $(document).on('click', '#login', function (e) {
                e.preventDefault();
                if ($("#username").val() != "admin" && $("#password").val() != "admin") {
                    alert("Invalid Credentials!");
                }
                else {
                    var username = $("#username").val();
                    var password = $("#password").val();
                    var adminLogin = {
                        Username: username,
                        Password: password,
                    };
                    alert("Logged in as Admin!");
                    localStorage.setItem('adminLogin', JSON.stringify(adminLogin));
                    window.location.replace("#/adminSide");
                }
            });
        });

        //home
        Path.map("#/home").to(function () {
            App.canvas.html("").append($.Mustache.render("home"));
            $(document).on('click', '#credentials', function (e) {
                e.preventDefault();
                window.location.replace("#/credentials");
            });
        });





        // user side

        // add user
        Path.map("#/credentials").to(function () {
            App.canvas.html("").append($.Mustache.render("credentials"));

            $(document).on('click', '#beginExam', function (e) {
                e.preventDefault();
                var examineesData = {
                    Firstname: $("#fname").val(),
                    Lastname: $("#lname").val(),
                    Email: $("#email").val(),
                    Birthdate: $("#birthdate").val(),
                    Contact: $("#contact").val()
                };

                $.ajax({
                    type: "POST",
                    url: "./api/addUser",
                    dataType: "json",
                    data: examineesData,
                }).then(
                    function (response) {
                        if (response.success == 0) {
                            alert("Username already in use!");
                            $("#uname").focus();
                        }
                        if (response.success == 1) {
                            console.log("First name: " + $("#fname").val());
                            console.log("Last name: " + $("#lname").val());
                            console.log("Email: " + $("#email").val());
                            console.log("Birthdate: " + $("#birthdate").val());
                            console.log("Contact: " + $("#contact").val());

                            $.getJSON('./api/viewUser', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("examineesData", JSON.stringify(response.html));
                                }
                            });
                            alert("Successfully Registered!");
                            window.location.replace("#/home");
                        }
                    },
                );
            });
        });

        Path.map("#/cate").to(function () {
            App.canvas.html("").append($.Mustache.render("credentials"));

        });

        Path.root("#/home");
        Path.listen();
    });
});