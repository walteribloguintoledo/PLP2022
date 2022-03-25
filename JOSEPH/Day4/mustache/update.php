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

$search_sql = "SELECT * FROM `users` WHERE username='$updateuname'";
$usernameResult = $conn->query($search_sql);
if($usernameResult->num_rows > 0) {
    echo json_encode(array('usernameExists' => true));
    exit();
}

$search_sql = "SELECT * FROM `users` WHERE email='$updateemail'";
$emailResult = $conn->query($search_sql);
if($emailResult->num_rows > 0) {
    echo json_encode(array('emailExists' => true));
    exit();
}

$update_sql = "UPDATE users SET firstname='$updatefname',lastname='$updatelname',username='$updateuname',email='$updateemail',password='$updatepassword',age='$updateage',birthdate='$updatebirthdate',contact='$updatecontact' WHERE id='$updateId'";

if(mysqli_query($conn, $update_sql)){
    echo json_encode(array('success' => 2));
}else if(mysqli_query($conn, $update_sql)){
    echo json_encode(array('success' => 1));
    echo "ERROR: Hush! Sorry $update_sql. " 
        . mysqli_error($conn);
}else if(mysqli_query($conn, $update_sql)){
    echo json_encode(array('success' => 0));
    echo "ERROR: Hush! Sorry $update_sql. " 
        . mysqli_error($conn);
}