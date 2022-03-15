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

$("#sign_up_form").on('submit', function (event) {
    event.preventDefault();

    // validations
    if (checkifEmpty(fullName) !== false) return;

    if (checkifEmpty(userName) !== false) return;

    if (checkifEmpty(address) !== false) return;

    if (checkifEmpty(birthDate) !== false) return;

    if (checkifEmpty(contactNumber) !== false) return;

    if (checkContactNumber(contactNumber) !== false) return;

    if (checkPassword(password, passwordConfirm) !== false) return;

    var user = {
        "name": fullName.val(),
        "username": userName.val(),
        "email": email.val(),
        "address": address.val(),
        "birth_date": birthDate.val(),
        "contact_number": contactNumber.val(),
        "password": passwordConfirm.val()
    }

    $.ajax({
        type: "POST",
        data: user,
        url: "controller/User.php?action=signup",
        success: function (data) {
            data = JSON.parse(data);

            if (data.error) {
                return alert(JSON.stringify(data.error.msg));
            }

            alert(data.result.msg);
            user = (({ name, email, username, address, birth_date, contact_number}) => ({ name, email, username, address, birth_date, contact_number}))(user);
            user["id"] = data.result.id;
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = routeHome;
        }
    })
});
