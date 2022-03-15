var currentUser = JSON.parse(localStorage.getItem('user')),
routeLogin = "#/login",
routeHome = "#/home";

if (currentUser === null) window.location.href = routeLogin;

function logout() {
    localStorage.removeItem("user");

    window.location.href = routeLogin;
}

var fullName = $('#full-name'),
    userName = $('#user-name'),
    email = $('#email-address'),
    address = $('#address'),
    birthDate = $('#birth-date'),
    contactNumber = $('#contact-number');

fullName.val(currentUser.name);
userName.val(currentUser.username);
email.val(currentUser.email);
address.val(currentUser.address);
birthDate.val(currentUser.birth_date);
contactNumber.val(currentUser.contact_number);

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

$("#update_form").on('submit', function (event) {
    event.preventDefault();

    if (checkifEmpty(fullName) !== false) return;

    if (checkifEmpty(userName) !== false) return;

    if (checkifEmpty(address) !== false) return;

    if (checkifEmpty(birthDate) !== false) return;

    if (checkifEmpty(contactNumber) !== false) return;

    if (checkContactNumber(contactNumber) !== false) return;

    $.ajax({
        type: "POST",
        data: {
            "id": currentUser.id,
            "name": fullName.val(),
            "username": userName.val(),
            "email": email.val(),
            "address": address.val(),
            "birth_date": birthDate.val(),
            "contact_number": contactNumber.val(),
        },
        url: "controller/User.php?action=update",
        success: function (data) {
            data = JSON.parse(data);

            if (data.error) {
                return alert(JSON.stringify(data.error.msg));
            }

            alert('Updated Successfully!');
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = routeHome;
        }
    });
});

// $( document ).ready(function() {
//     var params = new URLSearchParams(window.location.search);
//     var page = params.get('page');

//     $.ajax({
//         type: "POST",
//         data: {
//             "page": page,
//         },
//         url: "controller/User.php?action=get",
//         success: function (data) {
//             data = JSON.parse(data);

//             if (data.error) {
//                 return alert(JSON.stringify(data.error.msg));
//             }

//             console.log(data);
//         }
//     });
// });
