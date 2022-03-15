if (localStorage.getItem("currentLogin") == null) {
    window.location.replace("./login.html");
  }
$(document).ready(function () {

    if (localStorage.getItem("currentLogin") != null) {

        $("#btnCurrentUser").removeClass("hidden");

        $("#btnNotCurrentUser").addClass("hidden");
    }

    // sign out the user
    $("#btnLogout").click(function () { 
        localStorage.removeItem("currentLogin");
        window.location.replace("./login.html");
    });
});