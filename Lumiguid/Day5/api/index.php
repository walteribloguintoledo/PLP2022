<?php
  include 'functions.loader.php';

  $app = new Slim();

  $app->get('/', function(){
    echo 'Hello World ';
  });

  $app->post('/update',function(){
    $updateId = $_POST['U_Id'];
    $updateEmail = $_POST['U_Email'];
    $updatePassword = $_POST['U_Password'];
    $updateLastname = $_POST['U_Lastname'];
    $updateFirstname = $_POST['U_Firstname'];
    $updateAge = $_POST['U_Age'];
    $updateAddress = $_POST['U_Address'];

    // update user including the password
    $user_update = updateDataWithPass($updateId, $updateEmail, $updateEmail, $updatePassword, $updateLastname, $updateLastname,  $updateFirstname, $updateAge,$updateAddress);
    if($user_update != null){
      echo json_encode('Your record has been Updated') ;
    }else{
        echo json_encode('Please Check Your Query') ;
    }
  });

  $app->post('/signup',function(){
    $email = $_POST['Email'];
    $password =$_POST['Password'];
    $last_name = $_POST['Lastname'];
    $first_name =  $_POST['Firstname'];
    $age =  $_POST['Age'];
    $address = $_POST['Address'];

    if(checkEmail($email)) {
      echo json_encode(array('emailIsExist' => true));
      exit();
    }
    

    insertUser($email, $password,$last_name, $first_name,$age, $address);

    echo json_encode(array('success' => 1));
  });

  $app->post('/login',function(){
    $email = $_POST['Email'];
    $password = $_POST['Password'];
    $data = login($email, $password);
    if ($data != 0) {
      echo json_encode(array('isValid' => true,'Users'=>$data));
    } else {
      echo json_encode(array('isValid' => false));
    }
    
  });

  $app->post('/getData',function(){
    
    $UserId = $_POST['userID'];
    $data = getdata($UserId);
    echo json_encode($data);
  });

  $app->post('/delete',function(){
    $delete = $_POST['del_Id'];

    $deleteUser = deleteUser($delete);
    if($deleteUser == 1){
      echo json_encode('Your record has been Deleted') ;
      }else{
      echo json_encode('Please Check Your Query') ;
    }
  });
  
  $app->get('/view',function(){
    $viewdata = view();

    foreach($viewdata as $view) {
      $info[] = array(
        "id" => $view->id,
        "email" => $view->email,
        "lastname" => $view->lastname,
        "firstname" => $view->firstname,
        "age" => $view->age,
        "address" => $view->address
      );
    }

    $response = array(
      "status" => 'success',
      "html" => $info
    );

    echo json_encode($response);              
  });
  
  $app->run();
