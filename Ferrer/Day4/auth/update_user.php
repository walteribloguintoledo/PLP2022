<?php

require "db.php";

$username = $_POST['username'];
$password = $_POST['password'];
$password = $_POST['password'];
$full_name = $_POST['fullName'];
$address = $_POST['address'];
$birthdate = $_POST['birthdate'];
$contact_no = $_POST['contactNo'];

$sql = "UPDATE `users` 
		SET `password`='$password',`full_name`='$full_name',`address`='$address',`birthdate`='$birthdate',`contact_no`='$contact_no' 
		WHERE `username`='$username'";

if ($conn->query($sql) === FALSE) {
	echo json_encode(array(
		'success' => false,
		'message' => "Something went wrong!"
	));
	exit();
}

echo json_encode(array(
	'success' => true,
	'message' => 'Updated data is now in Database'));

$conn->close();