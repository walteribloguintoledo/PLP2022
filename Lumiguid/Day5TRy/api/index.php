<?php
  include 'functions.loader.php';

  $app = new Slim();
  $app->post('/update',function(){

    $updateId = $_POST['U_Id'];
    $updateEmail = $_POST['U_Email'];
    $updatePassword = $_POST['U_Password'];
    $updateLastname = $_POST['U_Lastname'];
    $updateFirstname = $_POST['U_Firstname'];
    $updateAge = $_POST['U_Age'];
    $updateAddress = $_POST['U_Address'];

    // update user including the password
    $user_update = updateDataWithPass($updateId, $updateEmail, $email, $updatePassword, $updateLastname, $updateLastname,  $updateFirstname, $updateAge,$updateAddress);
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


    $email_exists = checkEmail($email);

    if($email_exists == 0){
      $user_added = insertUser($email, $password,$last_name, $first_name,$age, $address);
      echo json_encode(array('emailIsExist' => true,'success' => 1));
    }else{
      echo json_encode(array('success' => 0));
    }
  });

  $app->post('/login',function(){
    $email = $_POST['Email'];
    $password = $_POST['Password'];
    $data = login($email, $password);

    if ($data != null) {
      echo json_encode(array('isValid' => true,'Users'=>$data));
    } else {
      echo json_encode(array('isValid' => false));
    }
    
  });

  $app->post('/getData',function(){
    
    $UserId = $_POST['userID'];
    $data = login($UserId);
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
  $app->post('/view',function(){
    $value="";
    $value='<table class="table table-striped table-dark">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Lastname</th>
                <th scope="col">Firstname</th>
                <th scope="col">Age</th>
                <th scope="col">Address</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
            </thead>';

    $viewdata = view();

    foreach($viewdata as $q){
      $value.='<tr>
                <th scope="col">'.$q['id'].'</th>
                <th scope="col">'.$q['email'].'</th>
                <th scope="col">'.$q['lastname'].'</th>
                <th scope="col">'.$q['firstname'].'</th>
                <th scope="col">'.$q['age'].'</th>
                <th scope="col">'.$q['address'].'</th>
                <th scope="col"><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#Edit" id="btnEdit" data-id ='.$row['id'].'><span>EDIT</span></button></th>
                <th scope="col"><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Delete" id="btnDelete" data-id2 ='.$row['id'].'><span>Delete</span></button></th>
              </tr>';     
              }
      $value.='</table>';
      echo json_encode(['status'=>'success','html'=>$value]);
              
  });
  $app->run();
