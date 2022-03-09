const signUpForm = document.querySelector("#signUpForm");
const fullName = document.querySelector("#fullName");
const userName = document.querySelector("#userName");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const bDay = document.querySelector("#bDay");
const contact = document.querySelector("#contact");
const pass = document.querySelector("#password");
const confirmPass = document.querySelector("#confirmPassword");

if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(fullName.value);
    console.log(userName.value);
    console.log(email.value);
    console.log(address.value);
    console.log(bDay.value);
    console.log(contact.value);

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
    } else if (pass.value == "") {
      alert("Please input Password.");
    } else if (confirmPass.value == "") {
      alert("Please input Confirm Password.");
    } else if (isNaN(contact.value)) {
      alert("Please input a number.");
    } else if (contact.value.length < 11 || contact.value.length > 11) {
      alert("Please input 11 digits only.");
    } else if (pass.value.length < 8) {
      alert("Password must be at least 8 characters.");
    } else if (pass.value !== confirmPass.value) {
      alert("Password does not match");
    } else {
      let today = new Date();
      const divInput = document.createElement("div");
      divInput.innerText =
        "Full Name: " +
        fullName.value +
        "\n" +
        "Username: " +
        userName.value +
        "\n" +
        "Email Address: " +
        email.value +
        "\n" +
        "Address: " +
        address.value +
        "\n" +
        "Birthday: " +
        bDay.value +
        "\n" +
        "Age: " +
        calculateAge(bDay.value) +
        "\n" +
        "Contact Number: " +
        contact.value +
        "\n" +
        "Date Submitted: " +
        today.toDateString() +
        " " +
        today.toLocaleTimeString();
      document.querySelector("#divValues").appendChild(divInput);

      // saving form values into an array
      const singleInfo = [];

      singleInfo.push(fullName.value);
      singleInfo.push(userName.value);
      singleInfo.push(email.value);
      singleInfo.push(address.value);
      singleInfo.push(bDay.value);
      singleInfo.push(contact.value);
      singleInfo.push(pass.value);
      singleInfo.push(confirmPass.value);

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
      const input = document.getElementsByTagName("input");
      for (let i = 0; i < input.length; i++) {
        accountInfo.push(input[i].value);
      }
      console.log(accountInfo);

      // objects
      const infoArr = [];
      for (let i = 0; i < input.length; i++) {
        const infoObj = {};
        infoObj[i] = input[i].value;
        infoArr.push(infoObj);
      }
      console.log(infoArr);
    }
  });
}

function calculateAge(year) {
  let yearBday = new Date(year);
  let today = new Date();
  let age = today.getFullYear() - yearBday.getFullYear();
  return age;
}
