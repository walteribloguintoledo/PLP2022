<?php
  include 'functions.loader.php';
  date_default_timezone_set("Asia/Manila"); 
  $app = new Slim();

  $app->get('/test/:var', function($var){
    echo date("Y-m-d H:i:s");

    echo var_dump(login($var));
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

      if($data){
        $verified = 1;
        $info= array($data->id, $data->uid, $data->fullname, $data->department, $data->date_created);
        //check duplicate records
        $duplicate_record = checkDuplicateRecords($user_id, $day, $night, $type, $status);
        if(!$duplicate_record){
          if($weekend == 0 || $weekend == 6){
            $remarks = check_records_today($user_id, $day, $night, $type, $status);
            $response = array(
              "data" => $info,
              "record" => 0,
              "info" => $remarks,
              "verified" => $verified
            );
          }else{
            $remarks = check_records_today($user_id, $day, $night, $type, $status);
            $new_user = checkNewUser($user_id, $day, $night);
            if($new_user){
              $new_info = array($new_user->id, $new_user->uid, $new_user->fullname, $new_user->department, $new_user->date_created);
              $response = array(
                "data" => $info,
                "record" => 0,
                "new" => $new_info,
                "info" => $remarks,
                "verified" => $verified
              );
            }else{
              $remarks_time_in = check_records_yesterday($user_id, $day_yesterday, $night_yesterday, $type, $status);
              if($remarks){
                $response = array(
                  "data" => $info,
                  "record" => 0,
                  "new"=> 0,
                  "info" => $remarks,
                  "verified" => $verified
                );
              }else{
                $response = array(
                  "data" => $info,
                  "record" => 0,
                  "new"=> 0,
                  "info" => $remarks_time_in,
                  "verified" => $verified
                );
              }
            }
          }
        }else{
          $record = array($duplicate_record->id, $duplicate_record->fullname, $duplicate_record->user_id, date("F d, Y", strtotime($duplicate_record->date_created)), date("h:i:s a", strtotime($duplicate_record->date_created)), $duplicate_record->type, $duplicate_record->status);
          $response = array(
            "data" => $info,
            "record" => $record,
            "verified" => $verified
          );
        }
      }else{
        $response = array(
          "data" => 0,
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
    if(isset($_POST['employeeID'])){
      $employee_id = $_POST['employeeID'];
      $full_name = $_POST['fullName'];
      $dept = $_POST['dept'];
      $profile_img = $_POST['profileImg'];
      $verified = 0;

      $uid_exists = checkUID($employee_id);
  
      if($uid_exists == 0){
        $user_added = insertUser($employee_id, $full_name, $dept);
        $verified = 1;

        $response = array(
          "user" => $user_added,
          "verified" => $verified
        );
        
        mkdir('./uploads/images/' . $user_added[1]);

        for($i = 1; $i <= count($profile_img); $i++){
          file_put_contents('./uploads/images/'. $user_added[1] . '/' . $user_added[1] ."-".$i.'.jpg', file_get_contents($profile_img[$i - 1]));
        }
      }else{
        $response = array(
          "user" => $uid_exists,
          "verified" => $verified
        );
      }
      echo json_encode($response);
    }
  });

  $app->run();
