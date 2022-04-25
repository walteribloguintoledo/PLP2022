<?php
  // attendance
  function attendance($id, $day, $night, $type, $remarks, $status){
    $person = ORM::for_table('attendance')->create();
    $person->set('uid', $id);
    $person->set('type', $type);
    if($remarks !== "null"){
      $person->set('remarks', $remarks);
    }else{
      $person->set('remarks', NULL);
    }
    $person->set('status', $status);
    $person->save();

    return $added_record = recent_added($id, $day, $night, $type, $status);
  }

  // display recent added record
  function recent_added($id, $day, $night, $type, $status){
    $query = ORM::for_table('users')->join('attendance', array('users.uid', '=', 'attendance.uid'))->where('attendance.uid', $id)->where_gte('attendance.date_created', $day)->where_lte('attendance.date_created', $night)->where('attendance.type', $type)->where('attendance.status', $status)->find_one();

    return $query;
  }

