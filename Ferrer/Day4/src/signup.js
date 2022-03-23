if (localStorage.getItem("currentUser") != null) {
	window.location.href = routes.home;
}

$("#form").on("submit", function (e) {
	e.preventDefault();

	let usernameExist = false;

	if (isEmpty($("#username").val())) {
		$("#username").focus();
		return alert("Username is required");
	}

	if (isEmpty($("#password").val())) {
		$("#password").focus();
		return alert("Password is required");
	}

	if (!isNumeric($("#password").val()) || !isAlpha($("#password").val())) {
		$("#password").focus();
		return alert("Password must be Alphanumeric");
	}

	if (containSpaces($("#password").val())) {
		$("#password").focus();
		return alert("Password must not contain any space");
	}

	if (isEmpty($("#fullName").val())) {
		$("#fullName").focus();
		return alert("Fullname is required");
	}

	if (isEmpty($("#address").val())) {
		$("#address").focus();
		return alert("Address is required");
	}

	if (isEmpty($("#birthdate").val())) {
		$("#birthdate").focus();
		return alert("Birthdate is required");
	}

	if (isEmpty($("#contactNo").val())) {
		$("#contactNo").focus();
		return alert("Contact No. is required");
	}

	if (isAlpha($("#contactNo").val())) {
		$("#contactNo").focus();
		return alert("Contact No. must not containe any characters");
	}

	if (mustBeLong($("#contactNo").val(), 11)) {
		$("#contactNo").focus();
		return alert("Contact No. must be 11 length long");
	}

	if (!usernameExist) {
		successSubmit();
	}

	function successSubmit() {
		let userData = {};
		// MANUAL ASSIGN
		userData["username"] = $("#username").val();
		userData["password"] = $("#password").val();
		userData["fullName"] = $("#fullName").val();
		userData["address"] = $("#address").val();
		userData["birthdate"] = $("#birthdate").val();
		userData["contactNo"] = $("#contactNo").val();

		// send to php
		$.ajax({
			type: "POST",
			url: `auth/auth_user.php?action=signup`,
			data: userData,
			dataType: "json",
			success: function (response) {
				if (response.userIsExist) {
					alert(`${userData.username} is already taken!`);
					$("#username").focus();
					return;
				}

				if (response.success) {
					alert("New user is created!");
					$("#form")[0].reset();
					let currentUser = new Object();
					currentUser["username"] = userData.username;
					currentUser["password"] = userData.password;
					localStorage.setItem("currentUser", JSON.stringify(currentUser));
					window.location.assign(routes.home);
					return;
				} else {
					alert("Something went wrong");
				}
			},
		});
	}
});
