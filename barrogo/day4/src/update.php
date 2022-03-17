<?php
  require('../config/db_connection.php');

  if(isset($_POST['password'])){
    $full_name = $_POST['fullName'];
    $user_name = $_POST['username'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $birthday = $_POST['birthday'];
    $contact = $_POST['contact'];
    $password = $_POST['password'];
    $verified = 1;

    // update user including the password
    $user_update = updateDataWithPass($full_name, $user_name, $email, $address, $birthday, $contact, $password, $conn);

    $response = array(
      'info' => $user_update,
      "verified" => $verified
    );

    echo json_encode($response);
  } else {
    $full_name = $_POST['fullName'];
    $user_name = $_POST['username'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $birthday = $_POST['birthday'];
    $contact = $_POST['contact'];
    $verified = 1;

    // update user without updating the password
    $user_update = updateData($full_name, $user_name, $email, $address, $birthday, $contact, $conn);

    $response = array(
      'info' => $user_update,
      "verified" => $verified
    );

    echo json_encode($response);
  }

  //update data with password
  function updateDataWithPass($name, $uname, $email, $address, $bday, $contact, $pass,$db){
    $sql = "UPDATE users SET fullname='$name', address='$address', birthday='$bday', contact='$contact', password='$pass' WHERE username='$uname' AND email='$email'";

    if (mysqli_query($db, $sql)) {
      return 1;
    } else {
      return "Error updating record: " . mysqli_error($db);
    }
    mysqli_close($db);
  }

  //update data
  function updateData($name, $uname, $email, $address, $bday, $contact, $db){
    $sql = "UPDATE users SET fullname='$name', address='$address', birthday='$bday', contact='$contact' WHERE username='$uname' AND email='$email'";

    if (mysqli_query($db, $sql)) {
      return 1;
    } else {
      return "Error updating record: " . mysqli_error($db);
    }
    mysqli_close($db);
  }
?>