let userList = JSON.parse(localStorage.getItem("usersInfo"));

if (localStorage.getItem("currentUser") != null) {
    window.location.replace("./index.html");
}

$("#form").submit(function (e) { 
    e.preventDefault();

    if (userList != null) {
        userList.forEach((user) => {
            if (user.username == $("#username").val() && user.password == $("#password").val()){
                window.location.replace("./index.html");
            } else {
                $(".error-message").removeClass("hide");
            }
        });
    } else {
        $(".error-message").removeClass("hide");
    }
    
}); 