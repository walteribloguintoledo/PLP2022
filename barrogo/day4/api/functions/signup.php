<?php
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