<?php
  if(isset($_POST['signUpBtn'])){
    print_r($_POST);

    echo "<br>";
    echo "<br>";
    echo "Full Name: " . $_POST['fullName'];
    echo "<br>";
    echo "Username: " . $_POST['userName'];
    echo "<br>";
    echo "Email Address: " . $_POST['email'];
    echo "<br>";
    echo "Address: " . $_POST['address'];
    echo "<br>";
    echo "Birth Date: " . $_POST['bDay'];
    echo "<br>";
    echo "Contact: " . $_POST['contact'];
  }
?>