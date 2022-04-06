<?php
  include('db/db_conn.php');

    $email = $_POST['username'];
    $password = $_POST['password'];


    $sql = "SELECT * FROM `users` WHERE `username`='$email' AND `password`='$password'";
    $result = $conn->query($sql);
    $results = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($results);

    if ($result->num_rows > 0) {
      echo json_encode(array('isValid' => true,'users'=>$row));
    } else {
      echo json_encode(array('isValid' => false));
    }
  