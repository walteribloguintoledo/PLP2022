let routes = {
	home: "#/home",
	login: "#/login",
	signup: "#/signup",
};

$(document).ready(function () {
	$.getScript("./src/validation.js").fail(function () {
		alert("Something went wrong!");
	});

	$.Mustache.options.warnOnMissingTemplates = true;

	$.Mustache.load("./templates/templates.html").done(function () {
		Path.map(routes.login).to(function () {
			$("#target").html("").append($.Mustache.render("login"));

			$.getScript("./src/login.js").fail(function () {
				alert("Something went wrong!");
			});
		});

		Path.map(routes.signup).to(function () {
			$("#target").html("").append($.Mustache.render("signup"));

			$.getScript("./src/signup.js").fail(function () {
				alert("Something went wrong!");
			});
		});

		Path.map(routes.home).to(function () {
			$("#target").html("").append($.Mustache.render("home"));

			$(document).ready(function () {
				// if logged in change the button to logout
				var currentUser = JSON.parse(localStorage.getItem("currentUser"));

				if (localStorage.getItem("currentUser") != null) {
					$(".btnCurrentUser").removeClass("hide");
					$("#btnNotCurrentUser").addClass("hide");
				}

				// Display all current user data.
				$.ajax({
					type: "GET",
					url: `./auth/get_user.php?username=${
						currentUser ? currentUser.username : ""
					}`,
					dataType: "json",
					success: function (response) {
						$("#username").val(response.username);
						$("#password").val(response.password);
						$("#fullName").val(response.fullName);
						$("#address").val(response.address);
						$("#birthdate").val(response.birthdate);
						$("#contactNo").val(response.contactNo);
					},
				});

				$.getScript("./src/editInfo.js").fail(function () {
					alert("Something went wrong!");
				});

				$.getScript("./src/deleteAccount.js").fail(function () {
					alert("Something went wrong!");
				});

				// sign out the user
				$("#logoutBtn").click(function (e) {
					localStorage.removeItem("currentUser");
					window.location.reload();
				});
			});
		});

		Path.root(routes.home);

		Path.rescue(function () {
			$("#target").html(`
				<p>404: URL is invalid</p>
				<a href=${routes.home}>Go back</a>
			`);
		});

		Path.listen();
	});
});
