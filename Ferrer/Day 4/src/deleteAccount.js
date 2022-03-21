$("#deleteAcc").on("click", () => {
	confirm(`WARNING: This action can't be undone!
Are you sure you want to delete this account?`);

	$.ajax({
		type: "GET",
		url: `auth/delete_user.php?username=${$("#username").val()}`,
		dataType: "json",
		success: function (response) {
			if (response.success) {
				alert(response.message);
				localStorage.removeItem("currentUser");
				window.location.href = routes.home;
				window.location.reload();
			} else {
				alert(response.message);
			}
		},
	});
});
