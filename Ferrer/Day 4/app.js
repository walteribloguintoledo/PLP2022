$(document).ready(function () {
	$.Mustache.options.warnOnMissingTemplates = true;

	$.Mustache.load("./templates/templates.html").done(function () {
		Path.map("#/login").to(function () {
			$("#target").html("").append($.Mustache.render("login"));

			$.ajax({
				url: "./src/login.js",
				dataType: "script",
			});
		});

		Path.map("#/signup").to(function () {
			$("#target").html("").append($.Mustache.render("signup"));

			$.ajax({
				url: "./src/signup.js",
				dataType: "script",
			});
		});

		Path.map("#/home").to(function () {
			$("#target").html("").append($.Mustache.render("home"));

			$(document).ready(function () {
				// if logged in change the button to logout

				if (localStorage.getItem("currentUser") != null) {
					$("#btnCurrentUser").removeClass("hidden");
					$("#btnNotCurrentUser").addClass("hidden");
				}

				// sign out the user
				$("#logoutBtn").click(function (e) {
					localStorage.removeItem("currentUser");
					window.location.href = "#/login";
				});
			});
		});

		Path.root("#/home");

		Path.listen();
	});
});
