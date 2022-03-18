<?php
  function connection(){
    $server_name = "localhost";
    $username = "root";
    $password = "";
    $dbname = "blog_barrogo";

    // Create connection
    $conn = new mysqli($server_name, $username, $password, $dbname);

    // Check connection
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
    }else{
      return $conn;
    }
  }