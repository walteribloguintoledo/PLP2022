$(document).ready(function () {

    // Set Value
    $("#changeText").text("new");

    // Get value
    console.log("From un to", $("#changeText").text());
    
    // add value in input element
    $("#quote").val("What's on your mind?");

    // if logged in change the button to logout

    if (localStorage.getItem("currentUser") != null) {
        $("#btnCurrentUser").removeClass("hidden");
        $("#btnNotCurrentUser").addClass("hidden");
    }

    // sign out the user
    $("#logoutBtn").click(function (e) { 
        localStorage.removeItem("currentUser");
        window.location.replace("./login.html");
    });
});