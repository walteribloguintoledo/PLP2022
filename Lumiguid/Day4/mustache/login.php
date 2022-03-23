<?php
  include('db/db_conn.php');
    $email = $_POST['Email'];
    $password = $_POST['Password'];


    $sql = "SELECT * FROM `users` WHERE `email`='$email' AND `password`='$password'";
    $result = $conn->query($sql);
    $results = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($results);

    if ($result->num_rows > 0) {
      echo json_encode(array('isValid' => true,'Users'=>$row));
    } else {
      echo json_encode(array('isValid' => false));
    }
  