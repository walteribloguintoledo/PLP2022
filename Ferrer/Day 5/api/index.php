<?php
  include 'functions.loader.php';

  $app = new Slim();

  // $app->get('/',function(){
  //   echo 'Hello World';
  // });

  $app->post('/login',function() {
    if(isset($_POST['username'])){
      $username = $_POST['username'];
      $password = $_POST['password'];
  
      if(login($username, $password) != 0) {
        echo "HEHEHEHEHEHE";
        $response = array(
          'isValid' => true
        );
      } else {
        $response = array(
          'isValid' => false
        );
      }
      echo json_encode($response);
    }
  });

  $app->run();
