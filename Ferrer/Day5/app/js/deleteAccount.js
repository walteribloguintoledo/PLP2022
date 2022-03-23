$("#deleteAcc").on("click", () => {
	var userData = JSON.parse(localStorage.getItem("currentUser"));

	if (
		confirm(`WARNING: This action can't be undone!
Are you sure you want to delete this account?`)
	) {
		$.ajax({
			type: "GET",
			url: "api/delete/" + userData.id,
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
	}
});
