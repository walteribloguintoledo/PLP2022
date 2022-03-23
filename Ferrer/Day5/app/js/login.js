if (localStorage.getItem("currentUser") != null) {
	window.location.href = routes.home;
}

$("#form").submit(function (e) {
	e.preventDefault();

	$.ajax({
		type: "POST",
		url: "api/login",
		data: {
			username: $("#username").val(),
			password: $("#password").val(),
		},
		dataType: "json",
		success: function (response) {
			if (response.isValid) {
				alert("You are logged in!");
				$(".incorrect-login").addClass("hide");

				createNewCurrentUser["id"] = response.data.id;
				createNewCurrentUser["username"] = response.data.username;
				createNewCurrentUser["password"] = response.data.password;
				localStorage.setItem(
					"currentUser",
					JSON.stringify(createNewCurrentUser)
				);

				window.location.href = routes.home;
			} else {
				$(".incorrect-login").removeClass("hide");
				alert("Credentials is incorrect");
			}
		},
	});
});
