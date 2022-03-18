<?php 

include "db.php";

if (isset($_REQUEST['action']) && !empty(isset($_REQUEST['action']))) {

  $action = $_REQUEST['action'];

  if ($action == 'signup') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $full_name = $_POST['fullName'];
    $address = $_POST['address'];
    $birthdate = $_POST['birthdate'];
    $contact_no = $_POST['contactNo'];

    $search_sql = "SELECT * FROM `users` WHERE username='$username'";
    $result = $conn->query($search_sql);

    if($result->num_rows > 0) {
      echo json_encode(array('userIsExist' => true));
      exit();
    }

    $sql = "INSERT INTO `users`(`username`, `password`, `full_name`, `address`, `birthdate`, `contact_no`) 
    VALUES ('$username','$password','$full_name','$address','$birthdate','$contact_no')";

    if ($conn->query($sql) === TRUE) {
      echo json_encode(array('success' => true));
    } else {
      echo json_encode(array('success' => false));
    }
  } elseif ($action == 'login') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM `users` WHERE `username`='$username' AND `password`='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
      echo json_encode(array('isValid' => true));
    } else {
      echo json_encode(array('isValid' => false));
    }
  }
}


$conn->close();