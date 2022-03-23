<?php
include "db/db_conn.php";

$UserId = $_POST['userID'];
$query = "SELECT * FROM users WHERE id='$UserId'";
$results = mysqli_query($conn,$query);

while($row=mysqli_fetch_assoc($results)){

    $User_data = array();
    $User_data[0] =$row['id'];
    $User_data[1] =$row['email'];
    $User_data[2] =$row['password'];
    $User_data[3] =$row['lastname'];
    $User_data[4] =$row['firstname'];
    $User_data[5] =$row['age'];
    $User_data[6] =$row['address'];
}
echo json_encode($User_data);
