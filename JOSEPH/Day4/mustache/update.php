<?php
include "db/db_conn.php";

$updateId = $_POST['UID'];
$updatefname =$_POST['UFirst'];
$updatelname = $_POST['ULast'];
$updateuname = $_POST['UUsername'];
$updateemail =  $_POST['UEmail'];
$updatepassword =  $_POST['UPassword'];
$updateage =  $_POST['UAge'];
$updatebirthdate = $_POST['UBirthdate'];
$updatecontact = $_POST['UContact'];

$valid_email = "SELECT * FROM `users` WHERE email='$updateemail'";
$emailResult = $conn->query($valid_email);
if($emailResult->num_rows > 0) {
    echo json_encode(array('emailExists' => true));
    exit();
}

$update_sql = "UPDATE users SET firstname='$updatefname',lastname='$updatelname',email='$updateemail',password='$updatepassword',age='$updateage',birthdate='$updatebirthdate',contact='$updatecontact' WHERE id='$updateId'";

if(mysqli_query($conn, $update_sql)){
    //assigns the key of the array 
    echo json_encode(array('success' => 1));
}else if(mysqli_query($conn, $update_sql)){
    echo json_encode(array('success' => 0));
}