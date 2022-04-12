<?php
  include 'functions.loader.php';
  date_default_timezone_set("Asia/Manila"); 
  $app = new Slim();

  $app->get('/timeStamp', function(){
    echo date("Y-m-d H:i:s");
  });

  $app->post('/login',function() {
    if(isset($_POST['userID'])){
      $user_id = $_POST['userID'];
      $type = $_POST['time'];
      $status = 1;
      $d = mktime(00, 00, 00);
      $n = mktime(23, 59, 59);
      $weekend = date("w", strtotime("yesterday"));
      $day_yesterday = date("Y-m-d", strtotime("yesterday"))." ". date("H:i:s", $d);
      $night_yesterday = date("Y-m-d", strtotime("yesterday"))." ". date("H:i:s", $n);
      $day = date("Y-m-d H:i:s", $d);
      $night = date("Y-m-d H:i:s", $n);
      $verified = 0;

      // function for login
      $data = login($user_id);

      if($data !== 0){
        $verified = 1;
        //check duplicate records
        $duplicate_record = checkDuplicateRecords($user_id, $day, $night, $type, $status);
        if($duplicate_record == 0){
          if($weekend == 0 || $weekend == 6){
            $remarks = check_records_today($user_id, $day, $night, $type, $status);
            $response = array(
              "data" => $data,
              "record" => $duplicate_record,
              "info" => $remarks,
              "verified" => $verified
            );
          }else{
            $remarks = check_records_today($user_id, $day, $night, $type, $status);
            $remarks_time_in = check_records_yesterday($user_id, $day_yesterday, $night_yesterday, $type, $status);
            if($remarks){
              $response = array(
                "data" => $data,
                "record" => $duplicate_record,
                "info" => $remarks,
                "verified" => $verified
              );
            }else{
              $response = array(
                "data" => $data,
                "record" => $duplicate_record,
                "info" => $remarks_time_in,
                "verified" => $verified
              );
            }
          }
        }else{
          $response = array(
            "data" => $data,
            "record" => $duplicate_record,
            "verified" => $verified
          );
        }
      }else{
        $response = array(
          "data" => $data,
          "verified" => $verified
        );
      }
      echo json_encode($response);
    }
  });

  $app->post('/attendance',function() {
    if(isset($_POST['fetchID'])){
      $user_id = $_POST['fetchID'];
      $type = $_POST['type'];
      $remarks = $_POST['remarks'];
      $status = 1;
      $d = mktime(00, 00, 00);
      $n = mktime(23, 59, 59);
      $day = date("Y-m-d H:i:s", $d);
      $night = date("Y-m-d H:i:s", $n);
      $verified = 0;

      $data = attendance($user_id, $day, $night, $type, $remarks, $status);

      if($data !== 0){
        $verified = 1;
        $response = array(
          "data" => $data,
          "remarks" => $remarks,
          "verified" => $verified
        );
        echo json_encode($response);
      }
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
        $user_added = insertUser($user_id, $full_name, $user_name, $email, $address, $birthday, $contact, $password);
        $verified = 1;

        $response = array(
          "id" => (int)$user_added,
          "userID" => $user_id,
          "user" => $user_exists,
          "email" => $email_exists,
          "verified" => $verified
        );
        
        if((int)$user_added < 10){
          $unique_id = "000". $user_added;
        }elseif((int)$user_added < 100){
          $unique_id = "00". $user_added;
        }elseif((int)$user_added < 999){
          $unique_id = "0". $user_added;
        }else{
          $unique_id = $user_added;
        }
        mkdir('./uploads/images/' . $unique_id);

        for($i = 1; $i <= count($profile_img); $i++){
          file_put_contents('./uploads/images/'. $unique_id . '/' . $unique_id ."-".$i.'.jpg', file_get_contents($profile_img[$i - 1]));
        }
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

  $app->run();
