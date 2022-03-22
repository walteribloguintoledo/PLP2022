<?php
include "db/db_conn.php";


$updateId = $_POST['U_Id'];
$updateEmail = $_POST['U_Email'];
$updatePassword = $_POST['U_Password'];
$updateLastname = $_POST['U_Lastname'];
$updateFirstname = $_POST['U_Firstname'];
$updateAge = $_POST['U_Age'];
$updateAddress = $_POST['U_Address'];

$update_sql = "UPDATE users SET email='$updateEmail',password='$updatePassword',lastname='$updateLastname',firstname='$updateFirstname',age='$updateAge',address='$updateAddress' WHERE id='$updateId'";
$results = mysqli_query($conn,$update_sql);
if($results){
    echo json_encode('Your record has been Updated') ;
}else{
    echo json_encode('Please Check Your Query') ;
}