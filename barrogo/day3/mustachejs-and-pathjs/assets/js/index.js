// login
var loginForm = $("#loginForm");
var loginUserName = $("#loginUserName");
var loginPassword = $("#loginPassword");
let attempts = 3;

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
var accounts = [];

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
      let userStorage = localStorage.getItem("usersInfo");
      userStorage = JSON.parse(userStorage);
      if (userStorage !== null) {
        var uniqueUsername = checkUsername(userName.val());
        var uniqueEmail = checkEmail(email.val());
        if (uniqueUsername !== null && uniqueEmail !== null) {
          var user = new Array(
            fullName.val(),
            userName.val(),
            email.val(),
            address.val(),
            bDay.val(),
            contact.val(),
            pass.val()
          );
          userStorage.push(user);
          // save to local storage
          localStorage.setItem("usersInfo", JSON.stringify(userStorage));
          window.location.href = "#/login";
        }
      } else {
        var user = new Array(
          fullName.val(),
          userName.val(),
          email.val(),
          address.val(),
          bDay.val(),
          contact.val(),
          pass.val()
        );
        accounts.push(user);
        // save to local storage
        localStorage.setItem("usersInfo", JSON.stringify(accounts));
        window.location.href = "#/login";
      }
    }
  });
}

// check if username already exists
function checkUsername(user) {
  let userStorage = localStorage.getItem("usersInfo");
  userStorage = JSON.parse(userStorage);
  for (let i = 0; i < userStorage.length; i++) {
    for (let j = 0; j < userStorage[i].length; j++) {
      if (userStorage[i][j] == user) {
        alert("Username already exists.");
        return null;
      }
    }
  }
}

// check if email already exists
function checkEmail(emails) {
  let userStorage = localStorage.getItem("usersInfo");
  userStorage = JSON.parse(userStorage);
  for (let i = 0; i < userStorage.length; i++) {
    for (let j = 0; j < userStorage[i].length; j++) {
      if (userStorage[i][j] == emails) {
        alert("Email address already exists.");
        return null;
      }
    }
  }
}

// login form
if (loginForm) {
  checkLogs();
  loginForm.submit(function (e) {
    e.preventDefault();
    if (loginUserName.val() == "") {
      alert("Please input Username.");
    } else if (loginPassword.val() == "") {
      alert("Please input Password.");
    } else {
      login(loginUserName.val(), loginPassword.val());
    }
  });
}

// login
function login(loggedUserName, loggedPassword) {
  let userStorage = localStorage.getItem("usersInfo");
  userStorage = JSON.parse(userStorage);

  if (userStorage !== null) {
    for (let i = 0; i < userStorage.length; i++) {
      for (let j = 0; j < userStorage[i].length; j++) {
        // check if the username is correct
        if (userStorage[i][j] == loggedUserName) {
          // check if the password is correct
          if (userStorage[i][6] == loggedPassword) {
            localStorage.setItem("userLogs", JSON.stringify(loggedUserName));
            window.location.href = "#/home";
          } else {
            alert("Invalid Username or Password."),
              // check attempts
              attempts--;
            if (attempts == 0 || attempts < 0) {
              alert("Login attempts has been exceeded");
              $("#loginBtn").attr("disabled", true);
              return false;
            } else {
              return alert("You only have " + attempts + " tries attempt");
            }
          }
        }
      }
    }
  }
}

// check if the user is logged in
function checkLogs() {
  let userLog = localStorage.getItem("userLogs");
  userLog = JSON.parse(userLog);

  if (userLog !== null) {
    window.location.href = "#/home";
  }
}
