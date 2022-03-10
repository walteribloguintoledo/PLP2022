const username = document.querySelector("#username");
const password = document.querySelector("#password");
const contactNo = document.querySelector("#contactNo");
const birthdate = document.querySelector("#birthdate");
const myForm = document.querySelector("#myForm");
let getValues = document.querySelector("#getvalue");
let getDate = document.querySelector("#getDate");

let isValid = false;

var dateToday = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let usersArray = new Array();
let usersObject = new Object();

myForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    var hasNumber = /[0-9]/g;
    var hasChar = /[a-z]|[A-Z]/g;

    /* Validation-------------------------------------------------- */
    if (username.value == "") {
        alert("Username is required");
        isValid = false;
        return;
    }

    if (password.value == "") {
        alert("Password is required");
        isValid = false;
        return;

    } else if (!hasNumber.test(password.value) || !hasChar.test(password.value)) {
        alert("Password must be alphanumeric");
        isValid = false;
        return;
    }

    if (contactNo.value == "" ) {
        alert("Contact No# is required");
        isValid = false;
        return; 

    } else if (hasChar.test(contactNo.value)) {
        alert("Contact must be a number");
        isValid = false;
        return;
    }

    if (birthdate.value == "") {
        alert("Birthdate is required");
        isValid = false;
        return;
    }
    // return true if all the condition is True
    isValid = true;

    /* Task: Printing values---------------------------------------------*/
    // test if the input from form is all valid
   if (isValid) {
    console.log(`
    Username: ${username.value}
    Password: ${password.value}
    Contact No#: ${contactNo.value}
    Birthdate: ${birthdate.value}`
    );

    getValues.innerHTML = `
    <p><b>Username: </b>${username.value}</p>
    <p><b>Password: </b>${password.value}</p>
    <p><b>Contact No#: </b>${contactNo.value}</p>
    <p><b>Birthdate: </b>${birthdate.value}</p>
    `

    /* Task: Get user Age---------------------------------------------*/

    getDate.innerHTML = `
    <p><b>Submitted Time: </b>${months[dateToday.getMonth()]} ${dateToday.getDate()}, ${dateToday.getFullYear()} (${dateToday.getHours()}:${dateToday.getMinutes()})</p>
    <p><b>User age is: </b> ${calculateAge(birthdate.value)}</p>
    `
   }
   else {
    console.log("Inputs are invalid, Please Try again...");
   }

   /* Task - Form arrays, objects and function -----------------------------*/

   let userData = [];
   // store data in array with properties
   userData["username"] = username.value;
   userData["password"] = password.value;
   userData["contact"] = contactNo.value;
   userData["birthdate"] = birthdate.value;

   // concat and display properties in userData
   let myArrayProperties = "";
   for (const user in userData) {
    myArrayProperties = `${myArrayProperties}|${user}`;
  }
  console.log(`My array properties are: ${myArrayProperties}|`);

  // Save multiple users with properties in Array and Object
  usersArray.push(userData);
  usersObject[userData.username] = userData;
  console.log("Array: ", usersArray);
  console.log("Object: ", usersObject);

  // clear form
  username.value = "";
  password.value = "";
  contactNo.value = "";
  birthdate.value = "";
});

/* FUNCTIONS --------------------------- */
function calculateAge(birthdate) {
    var dateToday = new Date();
    var formateBirthdate = new Date(birthdate);

    return dateToday.getFullYear() - formateBirthdate.getFullYear();
}
