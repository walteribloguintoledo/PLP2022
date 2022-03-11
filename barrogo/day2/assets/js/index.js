var signUpForm = document.querySelector("#signUpForm");
var fullName = document.querySelector("#fullName");
var userName = document.querySelector("#userName");
var email = document.querySelector("#email");
var address = document.querySelector("#address");
var bDay = document.querySelector("#bDay");
var contact = document.querySelector("#contact");
var pass = document.querySelector("#password");
var confirmPass = document.querySelector("#confirmPassword");
var accounts = [];
if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(fullName.value);
    // console.log(userName.value);
    // console.log(email.value);
    // console.log(address.value);
    // console.log(bDay.value);
    // console.log(contact.value);

    // validations
    if (fullName.value == "") {
      alert("Please input Full Name.");
    } else if (userName.value == "") {
      alert("Please input Username.");
    } else if (email.value == "") {
      alert("Please input Email Address.");
    } else if (address.value == "") {
      alert("Please input Address.");
    } else if (bDay.value == "") {
      alert("Please input Birthday.");
    } else if (contact.value == "") {
      alert("Please input Contact Number.");
    } else if (isNaN(contact.value)) {
      alert("Please input number only.");
    } else if (contact.value.length > 11 || contact.value.length < 11) {
      alert("Please input 11 digits only.");
    } else if (pass.value == "") {
      alert("Please input Password.");
    } else if (confirmPass.value == "") {
      alert("Please input Confirm Password.");
    } else if (pass.value.length < 8) {
      alert("Password must be at least 8 characters.");
    } else if (pass.value !== confirmPass.value) {
      alert("Password does not match");
    } else {
      // let today = new Date();
      // const divInput = document.createElement("div");
      // divInput.innerText =
      //   "Full Name: " +
      //   fullName.value +
      //   "\n" +
      //   "Username: " +
      //   userName.value +
      //   "\n" +
      //   "Email Address: " +
      //   email.value +
      //   "\n" +
      //   "Address: " +
      //   address.value +
      //   "\n" +
      //   "Birthday: " +
      //   bDay.value +
      //   "\n" +
      //   "Age: " +
      //   calculateAge(bDay.value) +
      //   "\n" +
      //   "Contact Number: " +
      //   contact.value +
      //   "\n" +
      //   "Date Submitted: " +
      //   today.toDateString() +
      //   " " +
      //   today.toLocaleTimeString();
      // document.querySelector("#divValues").appendChild(divInput);

      // saving form values into an array
      // const singleInfo = [];

      // singleInfo.push(fullName.value);
      // singleInfo.push(userName.value);
      // singleInfo.push(email.value);
      // singleInfo.push(address.value);
      // singleInfo.push(bDay.value);
      // singleInfo.push(contact.value);
      // singleInfo.push(pass.value);
      // singleInfo.push(confirmPass.value);

      //console.log(singleInfo);

      // Access and print array properties
      // print length of an array
      //console.log(singleInfo.length);

      // Add a new method
      // Array.prototype.myUpperCase = function () {
      //   for (let i = 0; i < this.length; i++) {
      //     this[i] = this[i].toUpperCase();
      //   }
      // };
      // Use the method on any array
      //singleInfo.myUpperCase();
      //console.log(singleInfo);

      // Saving multi user inputs that loop through the properties together with objects

      // arrays
      var user = new Array(
        fullName.value,
        userName.value,
        email.value,
        address.value,
        bDay.value,
        contact.value,
        password.value
      );

      accounts.push(user);
      //console.log(user);
      console.log(accounts);

      // clear fields
      fullName.value = "";
      userName.value = "";
      email.value = "";
      address.value = "";
      bDay.value = "";
      contact.value = "";
      password.value = "";
      confirmPassword.value = "";
      // for (let i = 0; i < input.length; i++) {
      //   accountInfo.push(input[i].value);
      // }
      // console.log(accountInfo);

      // objects
      // const infoArr = [];
      // for (let i = 0; i < input.length; i++) {
      //   const infoObj = {};
      //   infoObj[i] = input[i].value;
      //   infoArr.push(infoObj);
      // }
      //console.log(infoArr);
    }
  });
}

// search user
var searchForm = document.querySelector("#searchForm");
var searchVal = document.querySelector("#searchVal");
var divInput = document.createElement("div");

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var searchedName = "",
      searchedUser = "",
      searchedEmail = "",
      searchedAddress = "",
      searchedBDay = "",
      searchedContact = "";
    divInput.innerText = "";
    // for (let i = 0; i < accounts.length; i++) {
    //   for (let j = 0; j < accounts[i].length; j++) {
    //     if (accounts[i][j].toLowerCase() == searchVal.value.toLowerCase()) {
    //       searchedUser = accounts[i][j];
    //     }
    //   }
    // }
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i][1] == searchVal.value) {
        searchedName = accounts[i][0];
        searchedUser = accounts[i][1];
        searchedEmail = accounts[i][2];
        searchedAddress = accounts[i][3];
        searchedBDay = accounts[i][4];
        searchedContact = accounts[i][5];
      }
    }
    if (searchVal.value == "") {
      alert("Please enter data.");
    } else if (searchedUser == null || searchedUser == "") {
      //alert("User not found.");
      divInput.innerText = "User not found.";
      document.querySelector("#divValues").appendChild(divInput);
    } else {
      //alert(searchedUser);
      divInput.innerText =
        "Full Name: " +
        searchedName +
        "\n" +
        "Username: " +
        searchedUser +
        "\n" +
        "Email Address: " +
        searchedEmail +
        "\n" +
        "Address: " +
        searchedAddress +
        "\n" +
        "Birthday: " +
        searchedBDay +
        "\n" +
        "Age: " +
        calculateAge(searchedBDay) +
        "\n" +
        "Contact Number: " +
        searchedContact;
      document.querySelector("#divValues").appendChild(divInput);
    }
  });
}

// calculate age
function calculateAge(year) {
  let yearBday = new Date(year);
  let today = new Date();
  let age = today.getFullYear() - yearBday.getFullYear();
  return age;
}
