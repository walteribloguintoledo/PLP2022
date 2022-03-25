<?php

include "db/db_conn.php";

    $firstname = $_POST['firstname'];
    $lastname =$_POST['lastname'];
    $username = $_POST['username'];
    $email =  $_POST['email'];
    $password =  $_POST['password'];
    $age =  $_POST['age'];
    $birthdate = $_POST['birthdate'];
    $contact = $_POST['contact'];

    $search_sql = "SELECT * FROM `users` WHERE username='$username'";
    $usernameResult = $conn->query($search_sql);
    if($usernameResult->num_rows > 0) {
        echo json_encode(array('userIsExist' => true));
        exit();
      }

    $search_sql = "SELECT * FROM `users` WHERE email='$email'";
    $emailResult = $conn->query($search_sql);
    if($emailResult->num_rows > 1) {
        echo json_encode(array('emailIsExist' => true));
        exit();
      }
    $sql = "INSERT INTO users (firstname,lastname,username,email,password,age,birthdate,contact) VALUES ('$firstname','$lastname','$username','$email','$password','$age','$birthdate','$contact')"; 


    if(mysqli_query($conn, $sql)){
        echo json_encode(array('success' => 2));
    }else if(mysqli_query($conn, $sql)){
        echo json_encode(array('success' => 1));
        echo "ERROR: Hush! Sorry $sql. " 
           . mysqli_error($conn);
   }else{
        echo json_encode(array('success' => 0));
        echo "ERROR: Hush! Sorry $sql. " 
            . mysqli_error($conn);
    }

?>