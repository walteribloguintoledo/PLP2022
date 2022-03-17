<?php
  require('../config/db_connection.php');

  if(isset($_POST['fullName'])){
    $full_name = $_POST['fullName'];
    $user_name = $_POST['username'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $birthday = $_POST['birthday'];
    $contact = $_POST['contact'];
    $password = $_POST['password'];
    $verified = 1;

    $user_exists = checkUsername($conn, $user_name);
    $email_exists = checkEmail($conn, $email);

    if($user_exists == 0 && $email_exists == 0){
      $user_added = insertData($full_name, $user_name, $email, $address, $birthday, $contact, $password, $conn);

      $response = array(
        "user" => $user_exists,
        "email" => $email_exists,
        'info' => $user_added,
        "verified" => $verified
      );
    }else{
      $response = array(
        "user" => $user_exists,
        "email" => $email_exists,
        "verified" => $verified
      );
    }
    echo json_encode($response);
  }

  //check if username already exists
  function checkUsername($db, $uname){
    $query="SELECT * FROM users WHERE username = '$uname'";
    $result=mysqli_query($db,$query);

    if (mysqli_num_rows($result) > 0) {
      // output data of each row
      while($row = mysqli_fetch_assoc($result)) {
        return 1;
      }
    } else{
      return 0;
    }
  }

  //check if email address already exists
  function checkEmail($db, $email){
    $query="SELECT * FROM users WHERE email = '$email'";
    $result=mysqli_query($db,$query);

    if (mysqli_num_rows($result) > 0) {
      // output data of each row
      while($row = mysqli_fetch_assoc($result)) {
        return 1;
      }
    } else{
      return 0;
    }
  }

  //insert data
  function insertData($name, $uname, $email, $address, $bday, $contact, $password, $db){
    $sql = "INSERT INTO users (fullname, username, email, address, birthday, contact, password)
    VALUES ('$name', '$uname', '$email', '$address', '$bday', '$contact', '$password')";
  
    if (mysqli_query($db, $sql)) {
      return 'User Added.';
    } else {
      return "Error: " . $sql . "<br>" . mysqli_error($db);
    }
  
    mysqli_close($db);
  }
?>