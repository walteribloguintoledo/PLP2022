<?php
  function login($userID){
    $query = ORM::for_table('users')->where('uid', $userID)->find_one();
    
    return $query;
  }

  // check if the user is new
  function checkNewUser($id, $day, $night){
    $query = ORM::for_table('users')->where('uid', $id)->where_gte('date_created', $day)->where_lte('date_created', $night)->find_one();

    return $query;
  }

  //check duplicate records
  function checkDuplicateRecords($id, $day, $night, $type, $status){
    $query = ORM::for_table('users')->join('attendance', array('users.uid', '=', 'attendance.uid'))->where('users.uid', $id)->where_gte('attendance.date_created', $day)->where_lte('attendance.date_created', $night)->where('attendance.type', $type)->where('attendance.status', $status)->find_one();

    return $query;
  }

  // check records today
  function check_records_today($id, $day, $night, $type, $status){
    $check_time_in = ORM::for_table('users')->join('attendance', array('users.uid', '=', 'attendance.uid'))->where('users.uid', $id)->where_gte('attendance.date_created', $day)->where_lte('attendance.date_created', $night)->where('attendance.type', 'TIME IN')->where('attendance.status', $status)->count();
    $check_lunch_in = ORM::for_table('users')->join('attendance', array('users.uid', '=', 'attendance.uid'))->where('users.uid', $id)->where_gte('attendance.date_created', $day)->where_lte('attendance.date_created', $night)->where('attendance.type', 'LUNCH IN')->where('attendance.status', $status)->count();
    $check_lunch_out = ORM::for_table('users')->join('attendance', array('users.uid', '=', 'attendance.uid'))->where('users.uid', $id)->where_gte('attendance.date_created', $day)->where_lte('attendance.date_created', $night)->where('attendance.type', 'LUNCH OUT')->where('attendance.status', $status)->count();

    // set remarks
    $remarks = "";
    if($type == "LUNCH IN"){
      if($check_time_in == 0){
        $remarks = $remarks." "."No Time in.";
      }
    }
    if($type == "LUNCH OUT"){
      if($check_time_in == 0){
        $remarks = $remarks." "."No Time in.";
      }
      if($check_lunch_in == 0){
        $remarks = $remarks." "."No lunch in.";
      }
    }
    if($type == "TIME OUT"){
      if($check_time_in == 0){
        $remarks = $remarks." "."No Time in.";
      }
      if($check_lunch_in == 0){
        $remarks = $remarks." "."No lunch in.";
      }
      if($check_lunch_out == 0){
        $remarks = $remarks." "."No lunch out.";
      }
    }

    if($remarks === ""){
      return NULL;
    }else{
      return $remarks;
    }
  }

  // check records yesterday
  function check_records_yesterday($id, $day_yesterday, $night_yesterday, $type, $status){
    $check_time_in_yesterday = ORM::for_table('users')->join('attendance', array('users.uid', '=', 'attendance.uid'))->where('users.uid', $id)->where_gte('attendance.date_created', $day_yesterday)->where_lte('attendance.date_created', $night_yesterday)->where('attendance.type', 'TIME IN')->where('attendance.status', $status)->count();
    $check_lunch_in_yesterday = ORM::for_table('users')->join('attendance', array('users.uid', '=', 'attendance.uid'))->where('users.uid', $id)->where_gte('attendance.date_created', $day_yesterday)->where_lte('attendance.date_created', $night_yesterday)->where('attendance.type', 'LUNCH IN')->where('attendance.status', $status)->count();
    $check_lunch_out_yesterday = ORM::for_table('users')->join('attendance', array('users.uid', '=', 'attendance.uid'))->where('users.uid', $id)->where_gte('attendance.date_created', $day_yesterday)->where_lte('attendance.date_created', $night_yesterday)->where('attendance.type', 'LUNCH OUT')->where('attendance.status', $status)->count();
    $check_time_out_yesterday = ORM::for_table('users')->join('attendance', array('users.uid', '=', 'attendance.uid'))->where('users.uid', $id)->where_gte('attendance.date_created', $day_yesterday)->where_lte('attendance.date_created', $night_yesterday)->where('attendance.type', 'TIME OUT')->where('attendance.status', $status)->count();

    // set remarks
    $remarks = "";
    if($type == "TIME IN"){
      if($check_time_in_yesterday == 0){
        $remarks = $remarks." "."No Time in yesterday.";
      }
      if($check_lunch_in_yesterday == 0){
        $remarks = $remarks." "."No Lunch in yesterday.";
      }
      if($check_lunch_out_yesterday == 0){
        $remarks = $remarks." "."No Lunch out yesterday.";
      }
      if($check_time_out_yesterday == 0){
        $remarks = $remarks." "."No Time out yesterday.";
      }
    }
    
    if($remarks === ""){
      return NULL;
    }else{
      return $remarks;
    }
  }