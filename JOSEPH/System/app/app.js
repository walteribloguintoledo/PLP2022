$(document).ready(function () {
    var App = {
        canvas: $("#target"),
        navbar: $("#navbar"),
        menubar: $("#sidemenu")
    }

    $.Mustache.options.warnOnMissingTemplates = true;
    $.Mustache.load("./app/app.html").done(function () {

        //manageCategory
        Path.map("#/manageCategory").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));

            var allCategory = JSON.parse(localStorage.getItem('allCategory'));

            if (allCategory === null) {
                alert("No current data.");
            }
            else {
                var data = [];
                $.each(allCategory, function (index, item) {
                    var html = {
                        id: item.id,
                        uid: item.uid,
                        course: item.course,
                        subject: item.subject
                    }
                    data.push(html);
                });
                var categoryData = {
                    category: data
                }
                console.log(categoryData);

                $.getJSON('./api/viewCategory', function (response) {
                    if (response.status == 'success') {
                        localStorage.setItem("allCategory", JSON.stringify(response.html));
                    }
                });

                App.canvas.html("").append($.Mustache.render("manageCategory", categoryData));
            }

            $('#courseTable').dataTable();

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            if (currentUser === null) {
                alert("Please login first!");
                window.location.replace("#/login");
                window.location.reload();
            }

            $("#logout").click(function (e) {
                e.preventDefault();

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

            //deleteCategory
            $(document).on('click', '#btnDelete', function () {
                var currentUser = JSON.parse(localStorage.getItem('allCategory'));

                var DeleteID = $(this).attr('data-id2');
                $(document).on("click", '#deleteCategory', function () {
                    $.ajax({
                        type: "POST",
                        url: "./api/deleteCategory",
                        data: { categoryID: DeleteID },
                    }).then(
                        function (response) {
                            $.getJSON('./api/viewCategory', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allCategory", JSON.stringify(response.html));
                                    window.location.reload();
                                }
                            });
                            if (currentUser.length == 1) {
                                localStorage.removeItem("allCategory");
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

            //getCategory
            $(document).on('click', '#btnEdit', function () {

                var ID = $(this).attr('data-id');
                $.getJSON("./api/getCategory?categoryID=" + ID, function (response) {
                    $("#updateID").val(response.id);
                    $("#updateCourse").val(response.course);
                    $("#updateSubject").val(response.subject);
                });
            });
        });

        //addCategory
        Path.map("#/addCategory").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));
            App.canvas.html("").append($.Mustache.render("addCategory"));

            var allCategory = JSON.parse(localStorage.getItem('allCategory'));
            console.log(allCategory);

            var course = $("#course");

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            if (currentUser === null) {
                alert("Please login first!");
                window.location.replace("#/login");
                window.location.reload();
            }

            $("#categoryBack").click(function (e) {
                e.preventDefault();
                window.location.replace("#/manageCategory");
                window.location.reload();
            });

            $("#logout").click(function (e) {
                e.preventDefault();

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


            var counter = 0;
            function increment() {
                let temp;
                if (allCategory !== null) {
                    allCategory.forEach(cat => {
                        if (course[0].value == cat.course) {
                            temp = cat.uid;
                        }
                        else {
                            temp = counter++;
                        }
                    });
                }
                return temp;
            }

            $(document).on('click', '#addCategory', function () {
                console.log(increment());
                var newCategory = {
                    Course: $("#course").val(),
                    Subject: $("#subject").val(),
                    UID: increment(),
                };

                $.ajax({
                    type: "POST",
                    url: "./api/addCategory",
                    dataType: "json",
                    data: newCategory,
                }).then(
                    function (response) {
                        if (response.success == 1) {

                        }
                        if (response.success == 0) {
                            newCategory = {};
                            $.getJSON('./api/viewCategory', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allCategory", JSON.stringify(response.html));
                                }
                            });
                            alert("Course Added!");
                            window.location.replace("#/manageCategory");
                            window.location.reload();
                        }
                    },
                );
            });
        });

        //updateCategory
        Path.map("#/editCategory").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));
            App.canvas.html("").append($.Mustache.render("editCategory"));

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            if (currentUser === null) {
                alert("Please login first!");
                window.location.replace("#/login");
                window.location.reload();
            }

            $("#categoryBack").click(function (e) {
                e.preventDefault();
                window.location.replace("#/manageCategory");
                window.location.reload();
            });

            $("#logout").click(function (e) {
                e.preventDefault();

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

            $(document).on('click', '#updateCategory', function () {

                var updateCourse = $('#updateCourse');
                var updateSubject = $('#updateSubject');

                var updateCategory = {
                    CID: $("#updateID").val(),
                    CCourse: $("#updateCourse").val(),
                    CSubject: $("#updateSubject").val()
                };

                $.ajax({
                    type: "POST",
                    url: "./api/updateCategory",
                    dataType: "json",
                    data: updateCategory,
                }).then(
                    function (response) {
                        if (response.success == 0) {
                            $.getJSON('./api/viewCategory', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allCategory", JSON.stringify(response.html));
                                }
                            });
                            window.location.replace("#/manageCategory");
                            alert("Updated successfully!");
                            window.location.reload();
                        }
                    },
                );
            });
        });

        //manageExam
        Path.map("#/manageExam").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));

            var allExam = JSON.parse(localStorage.getItem('allExam'));
            console.log(allExam);

            if (allExam === null) {
                alert("No current data.");
            }
            else {
                var data = [];
                $.each(allExam, function (index, item) {
                    var html = {
                        id: item.id,
                        exam_id: item.exam_id,
                        exam_key: item.exam_key,
                        exam_value: item.exam_value,
                        exam_level: item.exam_level
                    }
                    data.push(html);
                });
                var examData = {
                    exam: data
                }
                console.log(examData);

                $.getJSON('./api/viewExam', function (response) {
                    if (response.status == 'success') {
                        localStorage.setItem("allExam", JSON.stringify(response.html));
                    }
                });

                App.canvas.html("").append($.Mustache.render("manageExam", examData));
            }

            $('#examTable').dataTable();

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            if (currentUser === null) {
                alert("Please login first!");
                window.location.replace("#/login");
                window.location.reload();
            }

            $("#logout").click(function (e) {
                e.preventDefault();

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
                var currentUser = JSON.parse(localStorage.getItem('allExam'));

                var DeleteID = $(this).attr('data-id2');
                $(document).on("click", '#deleteExam', function () {
                    $.ajax({
                        type: "POST",
                        url: "./api/deleteExam",
                        data: { ID: DeleteID },
                    }).then(
                        function (response) {
                            $.getJSON('./api/viewExam', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allExam", JSON.stringify(response.html));
                                    window.location.reload();
                                }
                            });
                            if (currentUser.length == 1) {
                                localStorage.removeItem("allExam");
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
                $.getJSON("./api/getExam?examID=" + ID, function (response) {
                    $("#updateID").val(response.id);
                    $("#updateExam_ID").val(response.exam_id);
                    $("#updateExam_Key").val(response.exam_key);
                    $("#updateExam_Value").val(response.exam_value);
                    $("#updateExam_Level").val(response.exam_level);
                });
            });
        });

        //chooseExamCategory
        Path.map("#/chooseExamCategory").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));

            $.getJSON('./api/viewCourse', function (response) {
                if (response.status == 'success') {
                    localStorage.setItem("allCourse", JSON.stringify(response.html));
                }
            });

            var allCourse = JSON.parse(localStorage.getItem('allCourse'));
            console.log(allCourse);

            var data = [];
            $.each(allCourse, function (index, item) {
                var html = {
                    course: item.course
                }
                data.push(html);
            });

            var courseData = {
                courses: data
            }

            console.log(courseData);

            App.canvas.html("").append($.Mustache.render("chooseExamCategory", courseData, subjectsData));

            $("#chooseCategoryBack").click(function (e) {
                e.preventDefault();
                window.location.replace("#/manageExam");
                window.location.reload();
            });

            $("#course").change(function () {
                alert($("#course option:selected").val());
            });

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            if (currentUser === null) {
                alert("Please login first!");
                window.location.replace("#/login");
                window.location.reload();
            }

            $("#logout").click(function (e) {
                e.preventDefault();

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

            $.getJSON('./api/viewSubject', function (response) {
                if (response.status == 'success') {
                    localStorage.setItem("allSubject", JSON.stringify(response.html));
                }
            });

            var allSubject = JSON.parse(localStorage.getItem('allSubject'));
            console.log(allSubject);

            var data = [];
            $.each(allSubject, function (index, item) {
                var html = {
                    subject: item.subject
                }
                data.push(html);
            });

            var subjectsData = {
                subjects: data
            }
        });

        //addExam
        Path.map("#/addExam").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));
            App.canvas.html("").append($.Mustache.render("addExam"));

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            if (currentUser === null) {
                alert("Please login first!");
                window.location.replace("#/login");
                window.location.reload();
            }

            $("#addExamBack").click(function (e) {
                e.preventDefault();
                window.location.replace("#/chooseExamCategory");
            });

            $("#logout").click(function (e) {
                e.preventDefault();

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

            $(document).on('click', '#addExam', function () {
                var newExam = {
                    Exam_ID: $("#exam_id").val(),
                    Exam_Key: $("#exam_key").val(),
                    Exam_Value: $("#exam_value").val(),
                    Exam_Level: $("#exam_level").val()
                };

                $.ajax({
                    type: "POST",
                    url: "./api/addExam",
                    dataType: "json",
                    data: newExam,
                }).then(
                    function (response) {
                        if (response.success == 0) {
                            $.getJSON('./api/viewExam', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allExam", JSON.stringify(response.html));
                                }
                            });
                            alert("Exam Added!");
                            window.location.replace("#/manageExam");
                            window.location.reload();
                        }
                    },
                );
            });
        });

        //editExam
        Path.map("#/editExam").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));
            App.canvas.html("").append($.Mustache.render("editExam"));

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            if (currentUser === null) {
                alert("Please login first!");
                window.location.replace("#/login");
                window.location.reload();
            }

            $("#updateback").click(function (e) {
                e.preventDefault();
                window.location.replace("#/manageExam");
            });

            $("#logout").click(function (e) {
                e.preventDefault();

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

            $(document).on('click', '#updateExam', function () {

                var updateExam_ID = $('#updateExam_ID');
                var updateExam_Key = $('#updateExam_Key');
                var updateExam_Value = $('#updateExam_Value');
                var updateExam_Level = $('#updateExam_Level');

                var updateExam = {
                    EID: $("#updateID").val(),
                    EExam_ID: $("#updateExam_ID").val(),
                    EExam_Key: $("#updateExam_Key").val(),
                    EExam_Value: $("#updateExam_Value").val(),
                    EExam_Level: $("#updateExam_Level").val()
                };

                $.ajax({
                    type: "POST",
                    url: "./api/updateExam",
                    dataType: "json",
                    data: updateExam,
                }).then(
                    function (response) {
                        if (response.success == 1) {
                            $.getJSON('./api/viewExam', function (response) {
                                if (response.status == 'success') {
                                    localStorage.setItem("allExam", JSON.stringify(response.html));
                                }
                            });
                            window.location.replace("#/manageExam");
                            alert("Data updated successfully!");
                            window.location.reload();
                        }
                    },
                );
            });
        });

        // examineeRanking
        Path.map("#/examineeRanking").to(function () {

            App.navbar.html("").append($.Mustache.render("top-nav-bar"));
            App.menubar.html("").append($.Mustache.render("side-menu-bar"));

            var examineeRanking = JSON.parse(localStorage.getItem('examineeRanking'));
            console.log(examineeRanking);

            var data = [];
            $.each(examineeRanking, function (index, item) {
                var html = {
                    firstname: item.firstname,
                    lastname: item.lastname,
                    course: item.course,
                    subject: item.subject,
                    score: item.score
                }
                data.push(html);
            });
            var rankingData = {
                ranking: data
            }
            console.log(rankingData);

            $.getJSON('./api/viewRanking', function (response) {
                if (response.status == 'success') {
                    localStorage.setItem("examineeRanking", JSON.stringify(response.html));
                }
            });

            App.canvas.html("").append($.Mustache.render("examineeRanking", rankingData));

            $('#rankingTable').dataTable();

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            $("#logout").click(function (e) {
                e.preventDefault();

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
        });

        // manageExaminee
        Path.map("#/manageExaminee").to(function () {

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
            var userData = {
                userInformation: data
            }
            console.log(userData);

            $.getJSON('./api/viewUser', function (response) {
                if (response.status == 'success') {
                    localStorage.setItem("examineesData", JSON.stringify(response.html));
                }
            });

            App.canvas.html("").append($.Mustache.render("manageExaminee", userData));

            $('#examineeTable').dataTable();

            var currentUser = JSON.parse(localStorage.getItem('adminLogin'));

            $("#logout").click(function (e) {
                e.preventDefault();

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
        });

        // admin login
        Path.map("#/login").to(function () {
            App.canvas.html("").append($.Mustache.render("login"));

            $(document).on('click', '#login', function (e) {
                e.preventDefault();
                if ($("#username").val() != "admin" || $("#password").val() != "admin") {
                    alert("Invalid Credentials!");
                }
                else {
                    var username = $("#username").val();
                    var password = $("#password").val();
                    var adminLogin = {
                        Username: username,
                        Password: CryptoJS.MD5(password),
                    };
                    alert("Logged in as Admin!");
                    localStorage.setItem('adminLogin', JSON.stringify(adminLogin));
                    window.location.replace("#/manageCategory");
                    window.location.reload();
                }
            });
        });

        //home
        Path.map("#/home").to(function () {
            App.canvas.html("").append($.Mustache.render("home"));
            $(document).on('click', '#userCredentials', function (e) {
                e.preventDefault();
                window.location.replace("#/userCredentials");
            });
        });

        //userCredentials
        Path.map("#/userCredentials").to(function () {
            App.canvas.html("").append($.Mustache.render("userCredentials"));

            $.getJSON('./api/json/category.json', function (data) {

                $("#category").change(function () {
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
                            window.location.replace("#/showQuestion");
                            window.location.reload();
                        }
                    },
                );
            });
        });

        Path.map("#/showQuestion").to(function () {
            App.canvas.html("").append($.Mustache.render("showQuestion"));

            $.getJSON("./api/showQuestion", function (response) {
                $("#questionID").val(response.id);
                $("#question").val(response.id);
                $("#questionChoice1").val(response.exam_id);
                $("#questionChoice2").val(response.exam_key);
                $("#questionChoice3").val(response.exam_value);
                $("#questionChoice4").val(response.exam_level);
            });
        });

        Path.root("#/home");
        Path.listen();
    });
});