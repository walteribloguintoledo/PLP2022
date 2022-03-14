var currentUser = JSON.parse(localStorage.getItem('user')),
    routeHome = "#/home";

if (currentUser !== null) window.location.href = routeHome;

var fullName = $('#full-name'),
    userName = $('#user-name'),
    email = $('#email-address'),
    address = $('#address'),
    birthDate = $('#birth-date'),
    contactNumber = $('#contact-number'),
    password = $('#password-field'),
    passwordConfirm = $('#confirm-password-field');

var listOfUsers = JSON.parse(localStorage.getItem('listOfUsers')) ?? new Array();
console.log(listOfUsers);

function removeWhiteSpace(value) { return value.replace(/\s/g, ""); }

function checkifEmpty(elem) {
    return removeWhiteSpace(elem.val()) === "" ? alert(elem.attr("id") + " is required.") : false;
}

function checkContactNumber(elem) {
    var size = 11;

    return elem.val().length < size ? alert(elem.attr("id") + " must be " + size + " digits.") : false;
}

function checkPassword(elem, elemConfirm) {
    var size = 8;
    if (elem.val().length < 8) return alert(elem.attr("id") + " must be " + size + " characters.");

    if (elem.val() !== elemConfirm.val()) return alert("Password doesn't match");

    return false;
}

function userNameAlreadyExists(elem) {
    if (listOfUsers === undefined) return false;

    var retrievedUser = null

    listOfUsers.forEach(user => {
        if (elem.val() === user.username) retrievedUser = user;
    });

    return retrievedUser !== null ? alert('username already taken!') : false;
}

function emailAlreadyExists(elem) {
    if (listOfUsers === undefined) return false;

    var retrievedUser = null

    listOfUsers.forEach(user => {
        if (elem.val() === user.email) retrievedUser = user;
    });

    return retrievedUser !== null ? alert('email already taken!') : false;
}

document.querySelector('#sign_up_form').addEventListener('submit', function (e) {
    e.preventDefault();

    // validations
    if (checkifEmpty(fullName) !== false) return;

    if (checkifEmpty(userName) !== false) return;

    if (userNameAlreadyExists(userName) !== false) return userName.val("");

    if (emailAlreadyExists(email) !== false) return email.val("");

    if (checkifEmpty(address) !== false) return;

    if (checkifEmpty(birthDate) !== false) return;

    if (checkifEmpty(contactNumber) !== false) return;

    if (checkContactNumber(contactNumber) !== false) return;

    if (checkPassword(password, passwordConfirm) !== false) return;

    var user = {
        name: fullName.val(),
        username: userName.val(),
        email: email.val(),
        address: address.val(),
        birth_date: birthDate.val(),
        contact_number: contactNumber.val(),
        password: passwordConfirm.val(),
    }

    localStorage.setItem('user', JSON.stringify(user));

    listOfUsers.push(user);

    localStorage.setItem('listOfUsers', JSON.stringify(listOfUsers));

    listOfUsers = JSON.parse(localStorage.getItem('listOfUsers'));

    console.log(listOfUsers, currentUser);

    window.location.href = routeHome;
});
