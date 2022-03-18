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

let usernameExist = false;

if (localStorage.getItem("currentUser") != null) {
	window.location.href = "#/home";
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
			url: `auth/process_user.php?action=signup`,
			data: userData,
			success: function (msg) {
				alert("Success");
			},
		});

		// Clear forms
		$("#form")[0].reset();

		// save the current user to local storage
		let currentUser = new Object();

		currentUser["username"] = userData.username;
		currentUser["password"] = userData.password;
		localStorage.setItem("currentUser", JSON.stringify(currentUser));

		window.location.href = "#/login";
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
