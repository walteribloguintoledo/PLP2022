<?php
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