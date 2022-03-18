<?php

include "db/db_conn.php";

    $email = $_GET['Email'];
    $password =$_GET['Password'];
    $last_name = $_GET['Lastname'];
    $first_name =  $_GET['Firstname'];
    $age =  $_GET['Age'];
    $address = $_GET['Address'];

    $sql = "INSERT INTO users (email,password,lastname,firstname,age,address) VALUES ('$email','$password','$last_name','$first_name','$age','$address')"; 

    if(mysqli_query($conn, $sql)){
        // echo "<h3>data stored in a database successfully." 
        //     . " Please browse your localhost php my admin" 
        //     . " to view the updated data</h3>";
        echo json_encode(array('success' => 1));
    } else{
         echo json_encode(array('success' => 0));
        echo "ERROR: Hush! Sorry $sql. " 
            . mysqli_error($conn);
    }
?>