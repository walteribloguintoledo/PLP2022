$(document).ready(function () {
	let createNewCurrentUser = new Object();

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
