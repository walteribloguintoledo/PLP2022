<?php
  include 'functions.loader.php';

  $app = new Slim();

  $app->post('/signup',function(){
    $firstname = $_POST['Firstname'];
    $lastname =$_POST['Lastname'];
    $username = $_POST['Username'];
    $email =  $_POST['Email'];
    $password =  $_POST['Password'];
    $age =  $_POST['Age'];
    $birthdate = $_POST['Birthdate'];
    $contact = $_POST['Contact'];

    if(checkUsername($username)) {
      echo json_encode(array('success' => 0));
      exit();
    }

    if(checkEmail($email)) {
      echo json_encode(array('success' => 1));
      exit();
    }

    insertUser($firstname, $lastname, $username, $email, $password, $age, $birthdate, $contact);
    echo json_encode(array('success' => 2));
  });

  $app->post('/login',function(){
    $username = $_POST['Username'];
    $password = $_POST['Password'];
    $valid = login($username, $password);
    if ($valid) {
      echo json_encode(array('success' => 1, 'users' => $valid));
    } else {
      echo json_encode(array('success' => 0));
    }
  });

$app->get('/view',function(){
    $viewdata = view();
    foreach($viewdata as $view) {
      $info[] = array(
        "id" => $view->id,
        "firstname" => $view->firstname,
        "lastname" => $view->lastname,
        "username" => $view->username,
        "email" => $view->email,
        "password" => $view->password,
        "age" => $view->age,
        "birthdate" => $view->birthdate,
        "contact" => $view->contact
      );
    }

    $response = array(
      "status" => 'success',
      "html" => $info
    );

    echo json_encode($response);              
  });

    $app->get('/getData',function(){
    
    $userID = $_GET['userID'];
    $data = getData($userID);

    $response = array(
        "id" => $data->id,
        "firstname" => $data->firstname,
        "lastname" => $data->lastname,
        "username" => $data->username,
        "email" => $data->email,
        "password" => $data->password,
        "birthdate" => $data->birthdate,
        "contact" => $data->contact
    );
    echo json_encode($response);
  });

  $app->post('/update',function(){
    $updateId = $_POST['UID'];
    $updateFirstname = $_POST['UFirst'];
    $updateLastname = $_POST['ULast'];
    $updateUsername = $_POST['UUsername'];
    $updateEmail = $_POST['UEmail'];
    $updatePassword = $_POST['UPassword'];
    $updateAge = $_POST['UAge'];
    $updateBirthdate = $_POST['UBirthdate'];
    $updateContact = $_POST['UContact'];

    if(checkUpdateEmail($updateEmail)) {
      echo json_encode(array('success' => 0));
      exit();
    }

    update($updateId, $updateFirstname, $updateLastname, $updateUsername,  $updateEmail, $updatePassword, $updateAge, $updateBirthdate, $updateContact);
    echo json_encode(array('success' => 1));
    
  });

  $app->post('/delete',function(){
    $userID = $_POST['ID'];

    $user_delete = deleteUser($userID);

    if($user_delete){
      echo json_encode('Your record has been deleted.') ;
    }else{
      echo json_encode('Something went wrong.') ;
    }
  });

  $app->run();