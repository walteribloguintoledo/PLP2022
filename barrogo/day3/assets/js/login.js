// check if the user is logged in
let user = localStorage.getItem("userLogs");
user = JSON.parse(user);

if (user !== null) {
  window.location.href = "home.html";
}

let userName = localStorage.getItem("userName");
let password = localStorage.getItem("pw");
userName = JSON.parse(userName);
password = JSON.parse(password);

let attempts = 3;
// form submit
$("#loginForm").submit(function (e) {
  e.preventDefault();

  if ($("#userName").val() == "") {
    alert("Please input Username.");
  } else if ($("#password").val() == "") {
    alert("Please input Password.");
  } else if (
    $("#userName").val() == userName &&
    $("#password").val() == password
  ) {
    localStorage.setItem("userLogs", JSON.stringify($("#userName").val()));
    window.location.href = "home.html";
  } else {
    alert("Access Denied");

    // check attempts
    attempts--;
    if (attempts == 0 || attempts < 0) {
      alert("Login attempts has been exceeded");
      $("#loginBtn").attr("disabled", true);
      return false;
    } else {
      alert("You only have " + attempts + " tries attempt");
    }
  }
});
