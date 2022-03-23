<?php
  include 'functions.loader.php';

  $app = new Slim();

  $app->get('/', function(){
    echo 'Hello World ';
  });

  $app->post('/login', function() {
    if(isset($_POST['username'])){
      $username = $_POST['username'];
      $password = $_POST['password'];

      $getUser = login($username, $password);
  
      if($getUser != 0) {
        $response = array(
          'isValid' => true,
          'data' => array(
            'id' => $getUser[0],
            'username' => $getUser[1],
            'password' => $getUser[2],
          )
        );
      } else {
        $response = array(
          'isValid' => false
        );
      }
      echo json_encode($response);
    }
  });

  $app->post('/signup', function() {
    if(isset($_POST['username'])){
      $username = $_POST['username'];
      $password = str_replace(' ', '', $_POST['password']); // remove spaces
      $full_name = $_POST['fullName'];
      $address = $_POST['address'];
      $birthdate = $_POST['birthdate'];
      $contact_no = $_POST['contactNo'];

      if(checkUsername($username)) {
        echo json_encode(array(
          'userIsExist' => true
        ));
        exit();
      }

     signup($username, $password, $full_name, $address, $birthdate, $contact_no);

      echo json_encode(array(
        'success' => true
      ));
    }
  });

  $app->get('/delete/:id', function($id) {
    deleteUser($id);

    echo json_encode(array(
      'success' => true,
      'message' => 'This account is deleted, redirecting to home page...'));
  });

  $app->get('/show/:id', function ($id) {
      $user_data = getData($id);
      if ($user_data != 0) {
      $response = array(
        'data'=> array(
          'username' => $user_data[0],
          'password' => $user_data[1],
          'full_name' => $user_data[2],
          'address' => $user_data[3],
          'birthdate' => $user_data[4],
          'contact_no' => $user_data[5],
        )
      );
      echo json_encode($response);
    }
  });

  $app->post('/update/:id', function($id) {
    $password = str_replace(' ', '', $_POST['password']); // remove spaces
    $full_name = $_POST['fullName'];
    $address = $_POST['address'];
    $birthdate = $_POST['birthdate'];
    $contact_no = $_POST['contactNo'];

    updateData($id, $password, $full_name, $address, $birthdate, $contact_no);

    echo json_encode(array(
      'success' => true,
      'message' => 'Updated data is now in Database'));
  });

  $app->run();
