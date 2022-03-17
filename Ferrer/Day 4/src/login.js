$(document).ready(function () {
	let userList = JSON.parse(localStorage.getItem("usersInfo"));
	let createNewCurrentUser = new Object();

	if (localStorage.getItem("currentUser") != null) {
		window.location.href = "#/home";
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
				// save to the current user to local storage
				createNewCurrentUser["username"] = $("#username").val();
				createNewCurrentUser["password"] = $("#password").val();
				localStorage.setItem(
					"currentUser",
					JSON.stringify(createNewCurrentUser)
				);
				$(".error-message").addClass("hide");
				window.location.href = "#/home";
			},
		});
	});
});
