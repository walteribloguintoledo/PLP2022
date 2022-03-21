<?php

require "db.php";

$username = $_GET['username'];
$id;

$search_id ="SELECT `id` FROM `users` WHERE `username`='$username' ";
$result = $conn->query($search_id);

if ($result->num_rows > 0) {
	$id = $result->fetch_assoc()['id'];

	$sql = "DELETE FROM users WHERE `id`='$id'";

	if ($conn->query($sql) === FALSE) {
		echo json_encode(array(
			'success' => false,
			'message' => "Something went wrong: " . $conn->error
		));
		exit();
	} else {
		echo json_encode(array(
			'success' => true,
			'message' => 'This account is deleted, redirecting to home page...'));
	}

} else {
	echo "ID does not exist";
}

$conn->close();