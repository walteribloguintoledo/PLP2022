<?php
include "db/db_conn.php";

$UserId = $_GET['userID'];
$query = "SELECT * FROM users WHERE id='$UserId'";
$results = mysqli_query($conn,$query);

foreach($results as $row){
    $response= array(
        "id" => $row['id'],
        "fname" => $row['firstname'],
        "lname" => $row['lastname'],
        "uname" => $row['username'],
        "email" => $row['email'],
        "password" => $row['password'],
        "cpassword" => $row['password'],
        "birthdate" => $row['birthdate'],
        "contact" => $row['contact']
    );
}
echo json_encode($response);