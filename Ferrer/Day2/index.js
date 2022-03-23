const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const contactNo = document.querySelector("#contactNo");
const address = document.querySelector("#address");
const birthdate = document.querySelector("#birthdate");
const myForm = document.querySelector("#myForm");
const inputs = document.querySelectorAll("input[name]")
let getValues = document.querySelector("#getvalue");
let getDate = document.querySelector("#getDate");

let showData = document.querySelector("#showData");
let dataHolder = document.querySelector("#dataHolder");

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

    if (confirmPassword.value == "") {
        alert("Confirm Password is required");
        isValid = false;
        return;

    } else if (confirmPassword.value != password.value) {
        alert("Confirm password is not match");
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

    if (address.value == "") {
        alert("Address field is required");
        isValid = false;
        return;
    }

    if (birthdate.value == "") {
        alert("Birthdate is required");
        isValid = false;
        return;
    }

    let usernameExist = false;

    // check if username is already exist
    usersArray.forEach((element, index) => {
        if(element[0] === username.value) {
            alert("username is already exist");
            usernameExist = true;
        } else {
            usernameExist = false;
        }
    });

    if (usernameExist) {
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
    Address: ${address.value}
    Birthdate: ${birthdate.value}`
    );

    getValues.innerHTML = `
    <p><b>Username: </b>${username.value}</p>
    <p><b>Password: </b>${password.value}</p>
    <p><b>Contact No#: </b>${contactNo.value}</p>
    <p><b>Address: </b>${address.value}</p>
    <p><b>Birthdate: </b>${birthdate.value}</p>
    `

    /* Task: Get user Age---------------------------------------------*/

    getDate.innerHTML = `
    <p><b>Submitted Time: </b>${months[dateToday.getMonth()]} ${dateToday.getDate()}, ${dateToday.getFullYear()} (${dateToday.getHours()}:${dateToday.getMinutes()})</p>
    <p><b>User age is: </b> ${calculateAge(birthdate.value)}</p>
    `

    /* Task - Form arrays, objects and function -----------------------------*/

    let userData = [];
    // store data in array with properties
    inputs.forEach((data, index) => {
        userData[index] = data.value;
    });

    // access array properties
    console.log(userData.length);

    // Save multiple users in Array and Object
    usersArray.push(userData);
    // use username as object key for uniqueness
    usersObject[userData[0]] = userData;

    console.log(usersArray);
    }
    else {
    console.log("Inputs are invalid, Please Try again...");
    }

  // clear form
    username.value = "";
    password.value = "";
    confirmPassword.value = "";
    contactNo.value = "";
    address.value = "";
    birthdate.value = "";

    dataHolder.innerHTML = "";
});

showData.addEventListener("click", () => {
    let getUsername = username.value;
    let searchedData = [];

    // Get searched data
    usersArray.forEach((element, index) => {
        if (element[0] === getUsername) {
            searchedData.push(element)
        } else {
            dataHolder.innerHTML = `
            <p><b>Username does not exist!</b></p>
            `
        }
    });

    // display searched data 
    searchedData.forEach(data => {
        dataHolder.innerHTML = `
        <p><b>Username: </b>${data[0]}</p>
        <p><b>Password: </b>${data[1]}</p>
        <p><b>Contact: </b>${data[3]}</p>
        <p><b>Address: </b>${data[4]}</p>
        <p><b>Birthdate: </b>${data[5]}</p>
        `
    });
})

/* FUNCTIONS --------------------------- */
function calculateAge(birthdate) {
    var dateToday = new Date();
    var formateBirthdate = new Date(birthdate);

    return dateToday.getFullYear() - formateBirthdate.getFullYear();
}

function welcomeUser (name) {
    return alert("Welcome " + name);
}