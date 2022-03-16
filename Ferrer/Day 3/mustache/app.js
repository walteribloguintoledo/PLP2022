$(document).ready(function () {
	$.Mustache.options.warnOnMissingTemplates = true;

	$.Mustache.load("./app/template.html").done(function () {
		Path.map("#/login").to(function () {
			$("#target").html("").append($.Mustache.render("login"));

			let userList = JSON.parse(localStorage.getItem("usersInfo"));
			let createNewCurrentUser = new Object();

			if (localStorage.getItem("currentUser") != null) {
				window.location.href = "#/homepage";
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

							window.location.replace("#/homepage");
						} else {
							$(".error-message").removeClass("hide");
						}
					});
				} else {
					$(".error-message").removeClass("hide");
				}
			});
		});

		Path.map("#/signup").to(function () {
			$("#target").html("").append($.Mustache.render("signup"));

			var dateToday = new Date();
			const months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			let usersArray = new Array();
			let usersObject = new Object();

			let usernameExist = false;

			// get usersInfo if null leave empty array
			let previousList = JSON.parse(localStorage.getItem("usersInfo")) || [];

			if (localStorage.getItem("currentUser") != null) {
				window.location.replace("#/homepage");
			}

			$("#form").on("submit", function (e) {
				e.preventDefault();

				if (isEmpty($("#username").val())) {
					alert("Username is required");
					return;
				}

				if (isEmpty($("#password").val())) {
					alert("Password is required");
					return;
				} else if (
					!isNumeric($("#password").val()) ||
					!isAlpha($("#password").val())
				) {
					alert("Password must be alphanumeric");
					return;
				}

				if (isEmpty($("#fullName").val())) {
					alert("Fullname is required");
					return;
				}

				if (isEmpty($("#address").val())) {
					alert("Address is required");
					return;
				}

				if (isEmpty($("#birthdate").val())) {
					alert("Birthdate is required");
					return;
				}

				if (isEmpty($("#contactNo").val())) {
					alert("Contact No. is required");
					return;
				} else if (isAlpha($("#contactNo").val())) {
					alert("Contact No. must not containe any characters");
					return;
				}

				// return if username is exist
				previousList.forEach((user) => {
					if ($("#username").val() == user.username) {
						alert($("#username").val() + " is already taken!");
						usernameExist = true;
						return;
					} else {
						usernameExist = false;
					}
				});

				if (!usernameExist) {
					successSubmit();
				}

				function successSubmit() {
					console.log(`
					Username: ${$("#username").val()}
					Password: ${$("#password").val()}
					Full name: ${$("#fullName").val()}
					Address: ${$("#address").val()}
					Birthdate: ${$("#birthdate").val()}
					Contact No: ${$("#contactNo").val()}`);

					$("#output").html(`
					<h2 class="primary-color">Output Here</h2>
					<p><b>Username: </b>${$("#username").val()}</p>
					<p><b>Password: </b>${$("#password").val()}</p>
					<p><b>Full name: </b>${$("#fullName").val()}</p>
					<p><b>Address: </b>${$("#address").val()}</p>
					<p><b>Birthdate: </b>${$("#birthdate").val()}</p>
					<p><b>Contact no.: </b>${$("#contactNo").val()}</p>`);

					$("#dates").html(`
					<h2 class="primary-color">Dates Here</h2>
					<p><b>Submitted Time: </b>${
						months[dateToday.getMonth()]
					} ${dateToday.getDate()}, ${dateToday.getFullYear()} (${dateToday.getHours()}:${dateToday.getMinutes()})</p>
					<p><b>Password: </b>${calculateAge($("#birthdate").val())}</p>
					`);

					let userData = {};
					// MANUAL ASSIGN
					userData["username"] = $("#username").val();
					userData["password"] = $("#password").val();
					userData["fullName"] = $("#fullName").val();
					userData["address"] = $("#address").val();
					userData["birthdate"] = $("#birthdate").val();
					userData["contactNo"] = $("#contactNo").val();

					// Count the number of items in associative array using it property ".length"
					console.log("Array Length is: ", Object.keys(userData).length);

					// Save multiple users in Array and Object
					usersArray.push(userData);
					// use username as object key for uniqueness
					usersObject[userData.username] = userData;

					// Clear forms
					$("#form")[0].reset();

					// save the current user to local storage
					let currentUser = new Object();

					currentUser["username"] = userData.username;
					currentUser["password"] = userData.password;
					localStorage.setItem("currentUser", JSON.stringify(currentUser));

					previousList.push(userData);

					// set the updated user list
					localStorage.setItem("usersInfo", JSON.stringify(previousList));

					// redirect user to login page after signing up
					window.location.href = "#/login";

					$.ajax({
						method: "POST",
						url: "some.php",
						dataType: "json",
						data: { name: "John", location: "Boston" },
					}).success(function (msg) {
						alert("Data Saved: " + msg);
						window.location.href = "#/login";
					});
				}
			});

			/* REUSABLE FUNCTIONS */
			function isNumeric(text) {
				var hasNumber = /[0-9]/g;

				if (hasNumber.test(text)) {
					return true;
				} else {
					return false;
				}
			}

			function isAlpha(text) {
				var hasChar = /[a-z]|[A-Z]/g;

				if (hasChar.test(text)) {
					return true;
				} else {
					return false;
				}
			}

			function isEmpty(text) {
				if (text === "") {
					return true;
				} else {
					return false;
				}
			}

			function calculateAge(birthdate) {
				var formateBirthdate = new Date(birthdate);

				return dateToday.getFullYear() - formateBirthdate.getFullYear();
			}
		});

		Path.map("#/homepage").to(function () {
			$("#target").html("").append($.Mustache.render("homepage"));
			$("#navBar").html("").append($.Mustache.render("navbar"));

			$(document).ready(function () {
				// Set Value
				$("#changeText").text("new");

				// Get value
				console.log("From un to", $("#changeText").text());

				// add value in input element
				$("#quote").val("What's on your mind?");

				// if logged in change the button to logout

				if (localStorage.getItem("currentUser") != null) {
					$("#btnCurrentUser").removeClass("hidden");
					$("#btnNotCurrentUser").addClass("hidden");
				}

				// sign out the user
				$("#logoutBtn").click(function (e) {
					localStorage.removeItem("currentUser");
					window.location.replace("#/login");
				});
			});
		});

		Path.map("#/posts").to(function () {
			$.ajax({
				type: "get",
				url: "./text.json",
				dataType: "json",
				success: function (res) {
					$("#target").html("").append(
						$.Mustache.render("posts", {
							res,
						})
					);
				},
			});
		});

		Path.map("#/404").to(function () {
			$("#target").html("404: URL couldn't");
		});

		// Set as root page
		Path.root("#/homepage");

		// Redirect to 404 page if URL is invalid
		Path.rescue(function () {
			window.location.replace("#/404");
		});

		Path.listen();
	});
});
