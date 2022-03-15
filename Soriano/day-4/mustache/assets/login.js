
var currentUser = JSON.parse(localStorage.getItem('user')), 
routeHome = "#/home";

if (currentUser !== null) window.location.href = routeHome;

function removeWhiteSpace(value) { return value.replace(/\s/g, ""); }

function checkifEmpty(elem) {
    return removeWhiteSpace(elem.val()) === "" ? alert(elem.attr("id") + " is required.") : false;
}

$("#login-form").on('submit', function (event) {
    event.preventDefault();

    var password = $('#password-field'), username = $('#username');

    if (checkifEmpty(username) !== false) return;

    $.ajax({
        type: "POST",
        data: {
            "username": $.trim(username.val()),
            "password": password.val()
        },
        url: "controller/User.php?action=login",
        success: function (data) {
            data = JSON.parse(data);

            if (data.error) {
                return alert(JSON.stringify(data.error.msg));
            }

            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = routeHome;
        }
    });
});
