<?php
  include 'functions.loader.php';

  $app = new Slim();

  $app->post('/login',function() {
    if(isset($_POST['username'])){
      $user_name = $_POST['username'];
      $password = md5($_POST['password']);
      $verified = 0;
  
      // function for login
      $data = login($user_name, $password);

      if($data == 0){
        $response = array(
          "info" => 0,
          "verified" => $verified
        );
      }else{
        $verified = 1;
        $response = array(
          "info" => $data,
          "verified" => $verified
        );
      }
      echo json_encode($response);
    }
  });

  $app->post('/signup',function() {
    if(isset($_POST['fullName'])){
      $user_id = $_POST['userID'];
      $full_name = $_POST['fullName'];
      $user_name = $_POST['username'];
      $email = $_POST['email'];
      $address = $_POST['address'];
      $birthday = $_POST['birthday'];
      $contact = $_POST['contact'];
      $password = md5($_POST['password']);
      $profile_img = $_POST['profileImg'];
      $verified = 0;
  
      $user_exists = checkUsername($user_name);
      $email_exists = checkEmail($email);
  
      if($user_exists == 0 && $email_exists == 0){
        $user_added = insertUser($user_id, $full_name, $user_name, $email, $address, $birthday, $contact, $password, $profile_img);
        $verified = 1;

        $response = array(
          "id" => $user_added,
          "user" => $user_exists,
          "email" => $email_exists,
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
  });

  $app->post('/update',function(){
    if(isset($_POST['password'])){
      $full_name = $_POST['fullName'];
      $user_name = $_POST['username'];
      $email = $_POST['email'];
      $address = $_POST['address'];
      $birthday = $_POST['birthday'];
      $contact = $_POST['contact'];
      $password = $_POST['password'];
      $verified = 1;
  
      // update user including the password
      $user_update = updateDataWithPass($full_name, $user_name, $email, $address, $birthday, $contact, $password);
  
      $response = array(
        'info' => $user_update,
        "verified" => $verified
      );
      echo json_encode($response);
    } else {
      $full_name = $_POST['fullName'];
      $user_name = $_POST['username'];
      $email = $_POST['email'];
      $address = $_POST['address'];
      $birthday = $_POST['birthday'];
      $contact = $_POST['contact'];
      $verified = 1;
  
      // update user without updating the password
      $user_update = updateData($full_name, $user_name, $email, $address, $birthday, $contact);
  
      $response = array(
        'info' => $user_update,
        "verified" => $verified
      );
      echo json_encode($response);
    }
  });

  $app->run();
