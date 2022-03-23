let userList = JSON.parse(localStorage.getItem("usersInfo"));
let createNewCurrentUser = new Object();

if (localStorage.getItem("currentUser") != null) {
	window.location.replace("./index.html");
}

$("#form").submit(function (e) {
	e.preventDefault();

	if (userList != null) {
		userList.forEach((user) => {
			if (
				user.username == $("#username").val() &&
				user.password == $("#password").val()
			) {
				// store the new login user to currentUser local storage
				createNewCurrentUser["username"] = $("#username").val();
				createNewCurrentUser["password"] = $("#password").val();

				localStorage.setItem(
					"currentUser",
					JSON.stringify(createNewCurrentUser)
				);

				window.location.replace("./index.html");
			} else {
				$(".error-message").removeClass("hide");
			}
		});
	} else {
		$(".error-message").removeClass("hide");
	}
});
