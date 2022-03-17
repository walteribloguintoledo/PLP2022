<?php 

include "db.php";

if (isset($_REQUEST['action']) && !empty(isset($_REQUEST['action']))) {

  $action = $_REQUEST['action'];

  if($action == 'signup') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $full_name = $_POST['fullName'];
    $address = $_POST['address'];
    $birthdate = $_POST['birthdate'];
    $contact_no = $_POST['contactNo'];

    $searchsql = "SELECT * FROM users WHERE 'username'=$username";
    
    if ($search_result = $conn->num_rows == 1) {
      echo "Username name is already taken!";
      $conn->close();
      exit();
    }

    $sql = "INSERT INTO `users`(`username`, `password`, `full_name`, `address`, `birthdate`, `contact_no`) 
    VALUES ('$username','$password','$full_name','$address','$birthdate','$contact_no')";

    if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
      return;
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
      return;
    }
  // } elseif ($action == 'login') {
  //   $username = $_POST['username'];
  //   $password = $_POST['password'];

  //   $sql = "SELECT * FROM `users` WHERE `username`='$username' AND `password`='$password'";
  //   $result = $conn->query($sql);

  //   if ($result->num_rows == 0) {
  //     exit("false");
  //   } else {
  //     exit("true");
  //   }
  }
}


$conn->close();