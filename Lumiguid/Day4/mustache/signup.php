<?php

include "db/db_conn.php";

    $email = $_POST['Email'];
    $password =$_POST['Password'];
    $last_name = $_POST['Lastname'];
    $first_name =  $_POST['Firstname'];
    $age =  $_POST['Age'];
    $address = $_POST['Address'];

    // $search_sql = "SELECT * FROM `users` WHERE username='$username'";
    // $usernameResult = $conn->query($search_sql);

    $search_sql = "SELECT * FROM `users` WHERE email='$email'";
    $emailResult = $conn->query($search_sql);
    // if(emailExist($conn,$email)){
    // }
    if($emailResult->num_rows > 0) {
        echo json_encode(array('emailIsExist' => true));
        exit();
      }
    // if($usernameResult->num_rows > 0) {
    //     echo json_encode(array('userIsExist' => true));
    //     exit();
    //   }

    $sql = "INSERT INTO users (email,password,lastname,firstname,age,address) VALUES ('$email','$password','$last_name','$first_name','$age','$address')"; 


    if(mysqli_query($conn, $sql)){
        echo json_encode(array('success' => 1));
    } else{
         echo json_encode(array('success' => 0));
        echo "ERROR: Hush! Sorry $sql. " 
            . mysqli_error($conn);
    }

?>