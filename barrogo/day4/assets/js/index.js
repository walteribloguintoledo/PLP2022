$(document).ready(function () {
  $.Mustache.options.warnOnMissingTemplates = true;

  $.Mustache.load("template.html").done(function () {
    Path.map("#/home").to(function () {
      $("#target").html("").append($.Mustache.render("home"));

      // logout
      var logout = $("#logout");

      // logout user
      if (logout) {
        logout.click(function () {
          localStorage.removeItem("userLogs");
          window.location.href = "#/login";
        });
      }

      // update form
      var updateForm = $("#updateForm");
      let userLog = localStorage.getItem("userLogs");
      userLog = JSON.parse(userLog);

      if (userLog) {
        $("#modal").show();
        logout.show();
        $("#signup").hide();
        $("#login").hide();
        $("#fullName").val(userLog[0]);
        $("#userName").val(userLog[1]);
        $("#email").val(userLog[2]);
        $("#address").val(userLog[3]);
        $("#bDay").val(userLog[4]);
        $("#contact").val(userLog[5]);

        updateForm.submit(function (e) {
          e.preventDefault();

          if ($("#fullName").val() == "") {
            alert("Please input Full Name.");
          } else if ($("#userName").val() == "") {
            alert("Please input Username.");
          } else if ($("#email").val() == "") {
            alert("Please input Email Address.");
          } else if ($("#address").val() == "") {
            alert("Please input Address.");
          } else if ($("#bDay").val() == "") {
            alert("Please input Birthday.");
          } else if ($("#contact").val() == "") {
            alert("Please input Contact Number.");
          } else if (isNaN($("#contact").val())) {
            alert("Please input a number.");
          } else if (
            $("#contact").val().length < 11 ||
            $("#contact").val().length > 11
          ) {
            alert("Please input 11 digits only.");
          } else if (
            $("#password").val() == "" &&
            $("#confirmPassword").val() !== ""
          ) {
            alert("Please input password.");
          } else if (
            $("#password").val() !== "" &&
            $("#confirmPassword").val() == ""
          ) {
            alert("Please input Confirm Password.");
          } else if (
            $("#password").val() !== "" &&
            $("#confirmPassword").val() !== "" &&
            $("#password").val().length < 8
          ) {
            alert("Password must be at least 8 characters.");
          } else if (
            $("#password").val() !== "" &&
            $("#confirmPassword").val() !== "" &&
            $("#password").val() !== $("#confirmPassword").val()
          ) {
            alert("Password does not match.");
          } else if (
            $("#password").val() == "" &&
            $("#confirmPassword").val() == ""
          ) {
            $.ajax({
              type: "POST",
              url: "update.php",
              dataType: "json",
              data: {
                fullName: $("#fullName").val(),
                username: $("#userName").val(),
                email: $("#email").val(),
                address: $("#address").val(),
                birthday: $("#bDay").val(),
                contact: $("#contact").val(),
              },
            }).done(function (data) {
              if (parseInt(data.verified) === 1) {
                if (data.info == 1) {
                  var updatedUser = new Array(
                    $("#fullName").val(),
                    $("#userName").val(),
                    $("#email").val(),
                    $("#address").val(),
                    $("#bDay").val(),
                    $("#contact").val()
                  );
                  localStorage.setItem("userLogs", JSON.stringify(updatedUser));
                  window.location.reload();
                }
              }
            });
          } else {
            $.ajax({
              type: "POST",
              url: "update.php",
              dataType: "json",
              data: {
                fullName: $("#fullName").val(),
                username: $("#userName").val(),
                email: $("#email").val(),
                address: $("#address").val(),
                birthday: $("#bDay").val(),
                contact: $("#contact").val(),
                password: $("#password").val(),
              },
            }).done(function (data) {
              if (parseInt(data.verified) === 1) {
                if (data.info == 1) {
                  var updatedUser = new Array(
                    $("#fullName").val(),
                    $("#userName").val(),
                    $("#email").val(),
                    $("#address").val(),
                    $("#bDay").val(),
                    $("#contact").val(),
                    $("#password").val()
                  );
                  localStorage.setItem("userLogs", JSON.stringify(updatedUser));
                  window.location.reload();
                }
              }
            });
          }
        });
      } else {
        $("#modal").hide();
        logout.hide();
        $("#signup").show();
        $("#login").show();
      }
    });
    Path.map("#/login").to(function () {
      $("#target").html("").append($.Mustache.render("login"));

      // login
      var loginForm = $("#loginForm");
      var loginUserName = $("#loginUserName");
      var loginPassword = $("#loginPassword");

      // login form
      if (loginForm) {
        let attempts = 3;
        checkLogs();
        loginForm.submit(function (e) {
          e.preventDefault();

          if (loginUserName.val() == "") {
            alert("Please input Username.");
          } else if (loginPassword.val() == "") {
            alert("Please input Password.");
          } else {
            $.ajax({
              type: "POST",
              url: "login.php",
              dataType: "json",
              data: {
                username: loginUserName.val(),
                password: loginPassword.val(),
              },
            }).done(function (data) {
              if (parseInt(data.verified) === 1) {
                if (data.info == 0) {
                  alert("Invalid Username or Password.");
                  attempts--;
                  if (attempts == 0 || attempts < 0) {
                    alert("Login attempts has been exceeded");
                    $("#loginBtn").attr("disabled", true);
                    return false;
                  } else {
                    alert("You only have " + attempts + " tries attempt");
                  }
                } else {
                  localStorage.setItem("userLogs", JSON.stringify(data.info));
                  window.location.href = "#/home";
                }
              }
            });
          }
        });
      }
    });
    Path.map("#/signUp").to(function () {
      $("#target").html("").append($.Mustache.render("signUp"));

      // sign up
      var signUpForm = $("#signUpForm");
      var fullName = $("#fullName");
      var userName = $("#userName");
      var email = $("#email");
      var address = $("#address");
      var bDay = $("#bDay");
      var contact = $("#contact");
      var pass = $("#password");
      var confirmPass = $("#confirmPassword");

      // signup form
      if (signUpForm) {
        checkLogs();
        signUpForm.submit(function (e) {
          e.preventDefault();

          if (fullName.val() == "") {
            alert("Please input Full Name.");
          } else if (userName.val() == "") {
            alert("Please input Username.");
          } else if (email.val() == "") {
            alert("Please input Email Address.");
          } else if (address.val() == "") {
            alert("Please input Address.");
          } else if (bDay.val() == "") {
            alert("Please input Birthday.");
          } else if (contact.val() == "") {
            alert("Please input Contact Number.");
          } else if (pass.val() == "") {
            alert("Please input Password.");
          } else if (confirmPass.val() == "") {
            alert("Please input Confirm Password.");
          } else if (isNaN(contact.val())) {
            alert("Please input a number.");
          } else if (contact.val().length < 11 || contact.val().length > 11) {
            alert("Please input 11 digits only.");
          } else if (pass.val().length < 8) {
            alert("Password must be at least 8 characters.");
          } else if (pass.val() !== confirmPass.val()) {
            alert("Password does not match");
          } else {
            $.ajax({
              type: "POST",
              url: "signup.php",
              dataType: "json",
              data: {
                fullName: fullName.val(),
                username: userName.val(),
                email: email.val(),
                address: address.val(),
                birthday: bDay.val(),
                contact: contact.val(),
                password: pass.val(),
              },
            }).done(function (data) {
              if (parseInt(data.verified) === 1) {
                if (data.user == 1) {
                  alert("Username already exists.");
                } else if (data.email == 1) {
                  alert("Email address already exists.");
                } else {
                  alert(data.info);
                  window.location.href = "#/login";
                }
              }
            });
          }
        });
      }
    });

    Path.root("#/home");

    Path.listen();
  });
});

// check if the user is logged in
function checkLogs() {
  let userLog = localStorage.getItem("userLogs");
  userLog = JSON.parse(userLog);

  if (userLog !== null) {
    window.location.href = "#/home";
  }
}
