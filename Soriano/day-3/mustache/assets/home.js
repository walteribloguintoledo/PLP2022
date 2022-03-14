var currentUser = JSON.parse(localStorage.getItem('user')),
routeLogin = "#/login";

if (currentUser === null) window.location.href = routeLogin;

function logout() {
    localStorage.removeItem("user");

    window.location.href = routeLogin;
}