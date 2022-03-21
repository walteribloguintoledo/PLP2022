<?php 

require "db.php";

if (isset($_GET['username']) && !empty(isset($_GET['username']))) {
	$username = $_GET['username'];

	$sql = "SELECT * FROM users WHERE `username`='$username'";
	$result = $conn->query($sql);

	if($result->num_rows > 0) {
	$row = $result->fetch_assoc();
	echo json_encode(array(
		"username" => $row['username'],
		"password" => $row['password'],
		"fullName" => $row['full_name'],
		"address" => $row['address'],
		"birthdate" => $row['birthdate'],
		"contactNo" => $row['contact_no'],
	));

	}
	$conn->close();
}

