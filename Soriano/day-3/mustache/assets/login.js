
var currentUser = JSON.parse(localStorage.getItem('user')), 
routeHome = "#/home";

if (currentUser !== null) window.location.href = routeHome;

var listOfUsers = JSON.parse(localStorage.getItem('listOfUsers')) ?? new Array(), retrievedUser = null;
console.log(listOfUsers);

function removeWhiteSpace(value) { return value.replace(/\s/g, ""); }

function checkifEmpty(elem) {
    return removeWhiteSpace(elem.val()) === "" ? alert(elem.attr("id") + " is required.") : false;
}

function grantAccess(usernameElem, passwordElem) {
    if (listOfUsers === undefined) return false;

    listOfUsers.forEach(user => {
        if ((usernameElem.val() === user.username || usernameElem.val() === user.email) && passwordElem.val() === user.password) {
            retrievedUser = user;
        }
    });

    return retrievedUser === null ? alert('Wrong Credentials!') : false;
}

document.querySelector('#login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var password = $('#password-field'), username = $('#username');

    if (checkifEmpty(username) !== false) return;

    if (grantAccess(username, password) !== false) {
        username.val("");
        password.val("");

        return;
    }

    localStorage.setItem('user', JSON.stringify(retrievedUser));

    window.location.href = routeHome;
});
