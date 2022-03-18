$(document).ready(function () {
	let userList = JSON.parse(localStorage.getItem("usersInfo"));
	let createNewCurrentUser = new Object();

	if (localStorage.getItem("currentUser") != null) {
		window.location.href = routes.home;
	}

	$("#form").submit(function (e) {
		e.preventDefault();

		$.ajax({
			type: "POST",
			url: "auth/process_user.php?action=login",
			data: {
				username: $("#username").val(),
				password: $("#password").val(),
			},
			dataType: "json",
			success: function (response) {
				if (response.isValid) {
					alert("You are logged in!");
					$(".incorrect-login").addClass("hide");

					createNewCurrentUser["username"] = $("#username").val();
					createNewCurrentUser["password"] = $("#password").val();
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
});
