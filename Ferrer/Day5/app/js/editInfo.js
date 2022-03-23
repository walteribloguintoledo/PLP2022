$("#editInfo").click(function (e) {
	$(this).addClass("hide");
	$("#saveInfo").removeClass("hide");
	$(".editable").removeAttr("disabled");
});

$("#closeModal").click(function (e) {
	$(".editable").attr("disabled", true);
	$("#editInfo").removeClass("hide");
	$("#saveInfo").addClass("hide");
});

$("#myInfo").on("submit", function (e) {
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

	var userData = JSON.parse(localStorage.getItem("currentUser"));

	$.ajax({
		type: "POST",
		url: `api/update/${userData.id}`,
		data: $(this).serialize(),
		dataType: "json",
		success: function (response) {
			if (response.success) {
				alert(response.message);
			}
		},
	});

	$("#editInfo").removeClass("hide");
	$("#saveInfo").addClass("hide");
	$(".editable").attr("disabled", true);
});
