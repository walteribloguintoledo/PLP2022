let routes = {
	home: "#/home",
	login: "#/login",
	signup: "#/signup",
};

$(document).ready(function () {
	$.Mustache.options.warnOnMissingTemplates = true;

	$.Mustache.load("./templates/templates.html").done(function () {
		Path.map(routes.login).to(function () {
			$("#target").html("").append($.Mustache.render("login"));

			$.ajax({
				url: "./src/login.js",
				dataType: "script",
			});
		});

		Path.map(routes.signup).to(function () {
			$("#target").html("").append($.Mustache.render("signup"));

			$.ajax({
				url: "./src/signup.js",
				dataType: "script",
			});
		});

		Path.map(routes.home).to(function () {
			$("#target").html("").append($.Mustache.render("home"));

			$(document).ready(function () {
				// if logged in change the button to logout

				if (localStorage.getItem("currentUser") != null) {
					$(".btnCurrentUser").removeClass("hide");
					$("#btnNotCurrentUser").addClass("hide");
				}

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
