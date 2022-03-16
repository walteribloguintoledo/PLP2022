<?php
  require('./config/db_connection.php');
  
  if(isset($_POST['username'])){
    $user_name = $_POST['username'];
    $password = $_POST['password'];
    $verified = 1;

    // function for login
    $data = login($conn, $user_name, $password);
    $response = array(
      "info" => $data,
      "verified" => $verified
    );
    echo json_encode($response);
  }

  function login($db, $uname, $pass){
    $query="SELECT * FROM users WHERE username = '$uname' AND password = '$pass'";
    $result=mysqli_query($db,$query);

    if (mysqli_num_rows($result) > 0) {
      // output data of each row
      while($row = mysqli_fetch_assoc($result)) {
        return userData($row);
      }
    } else{
      return 0;
    }
    mysqli_close($db);
  }

  // save all data to array
  function userData($array){
    $user_data = array(
      $array['fullname'],
      $array['username'],
      $array['email'],
      $array['address'],
      $array['birthday'],
      $array['contact'],
      $array['password']
    );

    return $user_data;
  }

?>