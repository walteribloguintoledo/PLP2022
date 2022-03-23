let routes = {
	home: "#/home",
	login: "#/login",
	signup: "#/signup",
};

let createNewCurrentUser = new Object();

$(document).ready(function () {
	$.getScript("./app/js/validation.js").fail(function () {
		alert("Something went wrong!");
	});

	$.Mustache.options.warnOnMissingTemplates = true;

	$.Mustache.load("./app/templates/templates.html").done(function () {
		Path.map(routes.login).to(function () {
			$("#target").html("").append($.Mustache.render("login"));

			$.getScript("./app/js/login.js").fail(function () {
				alert("Something went wrong!");
			});
		});

		Path.map(routes.signup).to(function () {
			$("#target").html("").append($.Mustache.render("signup"));

			$.getScript("./app/js/signup.js").fail(function () {
				alert("Something went wrong!");
			});
		});

		Path.map(routes.home).to(function () {
			$("#target").html("").append($.Mustache.render("home"));

			// if logged in change the button to logout
			var currentUser = JSON.parse(localStorage.getItem("currentUser"));

			if (localStorage.getItem("currentUser") != null) {
				$(".btnCurrentUser").removeClass("hide");
				$("#btnNotCurrentUser").addClass("hide");
			}

			// Display all current user data.
			$("#viewMyData").on("click", function () {
				$.ajax({
					type: "GET",
					url: `api/show/${currentUser ? currentUser.id : ""}`,
					dataType: "json",
					success: function (response) {
						$("#username").val(response.data.username);
						$("#password").val(response.data.password);
						$("#fullName").val(response.data.full_name);
						$("#address").val(response.data.address);
						$("#birthdate").val(response.data.birthdate);
						$("#contactNo").val(response.data.contact_no);
					},
				});
			});

			$.getScript("./app/js/editInfo.js").fail(function () {
				alert("Something went wrong!");
			});

			$.getScript("./app/js/deleteAccount.js").fail(function () {
				alert("Something went wrong!");
			});

			// sign out the user
			$("#logoutBtn").click(function (e) {
				localStorage.removeItem("currentUser");
				window.location.reload();
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
