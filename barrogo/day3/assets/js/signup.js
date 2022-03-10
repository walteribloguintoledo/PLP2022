// // Get, set and add values using JQuery
// $("#signUpForm").submit(function (e) {
//   e.preventDefault();

//   // get values
//   console.log($("#fullName").val());
//   console.log($("#userName").val());
//   console.log($("#email").val());
//   console.log($("#address").val());
//   console.log($("#bDay").val());
//   console.log($("#contact").val());

//   // set values
//   $("h3").text("Barrogo");

//   // add values
//   $("h3").prepend("Hello ");
//   $("h3").append(" World");
//   this.before("Text before form");
//   this.after("Text after form");
// });

// check if the user is logged in
let user = localStorage.getItem("userLogs");
user = JSON.parse(user);

if (user !== null) {
  window.location.href = "home.html";
}

// form submit
$("#signUpForm").submit(function (e) {
  e.preventDefault();
  console.log($("#fullName").val());
  console.log($("#userName").val());
  console.log($("#email").val());
  console.log($("#address").val());
  console.log($("#bDay").val());
  console.log($("#contact").val());

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
  } else if ($("#password").val() == "") {
    alert("Please input Password.");
  } else if ($("#confirmPassword").val() == "") {
    alert("Please input Confirm Password.");
  } else if (isNaN($("#contact").val())) {
    alert("Please input a number.");
  } else if (
    $("#contact").val().length < 11 ||
    $("#contact").val().length > 11
  ) {
    alert("Please input 11 digits only.");
  } else if ($("#password").val().length < 8) {
    alert("Password must be at least 8 characters.");
  } else if ($("#password").val() !== $("#confirmPassword").val()) {
    alert("Password does not match");
  } else {
    let today = new Date();

    const output =
      "Full Name: " +
      $("#fullName").val() +
      "<br/>" +
      "Username: " +
      $("#userName").val() +
      "<br/>" +
      "Email Address: " +
      $("#email").val() +
      "<br/>" +
      "Address: " +
      $("#address").val() +
      "<br/>" +
      "Birthday: " +
      $("#bDay").val() +
      "<br/>" +
      "Age: " +
      calculateAge($("#bDay").val()) +
      "<br/>" +
      "Contact Number: " +
      $("#contact").val() +
      "<br/>" +
      "Date Submitted: " +
      today.toDateString() +
      " " +
      today.toLocaleTimeString();
    $("#divValues").append(output);

    // saving form values into an array
    const singleInfo = [];

    singleInfo.push($("#fullName").val());
    singleInfo.push($("#userName").val());
    singleInfo.push($("#email").val());
    singleInfo.push($("#address").val());
    singleInfo.push($("#bDay").val());
    singleInfo.push($("#contact").val());
    singleInfo.push($("#password").val());
    singleInfo.push($("#confirmPassword").val());

    console.log(singleInfo);

    // Access and print array properties
    // print length of an array
    console.log(singleInfo.length);

    // Add a new method
    Array.prototype.myUpperCase = function () {
      for (let i = 0; i < this.length; i++) {
        this[i] = this[i].toUpperCase();
      }
    };
    // Use the method on any array
    singleInfo.myUpperCase();
    console.log(singleInfo);

    // Saving multi user inputs that loop through the properties together with objects

    // arrays
    const accountInfo = [];
    $("input").each(function () {
      accountInfo.push($(this).val());
    });
    console.log(accountInfo);

    // objects
    const infoArr = [];
    $("input").each(function (index) {
      const infoObj = {};
      infoObj[index] = $(this).val();
      infoArr.push(infoObj);
    });

    console.log(infoArr);

    // local storage JSON parse JSON stringify
    localStorage.setItem("usersInfo", JSON.stringify(accountInfo));
    let items = localStorage.getItem("usersInfo");
    items = JSON.parse(items);

    console.log(items);

    // save userName and password to local storage
    localStorage.setItem("userName", JSON.stringify($("#userName").val()));
    localStorage.setItem("pw", JSON.stringify($("#password").val()));

    window.location.href = "login.html";
  }
});

function calculateAge($year) {
  let yearBday = new Date($year);
  let today = new Date();
  let age = today.getFullYear() - yearBday.getFullYear();
  return age;
}
