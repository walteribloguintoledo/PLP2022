<?php
  // attendance
  function attendance($id, $day, $night, $type, $remarks, $status){
    $person = ORM::for_table('attendance')->create();
    $person->set('user_id', $id);
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
    $query = ORM::for_table('attendance')->join('users', array('attendance.user_id', '=', 'users.id'))->where('user_id', $id)->where_gte('date_created', $day)->where_lte('date_created', $night)->where('type', $type)->where('status', $status)->find_one();

    if ($query) {
      // output data of each row
      return $user_data = array($query->id, $query->fullname, $query->user_id, date("F d, Y", strtotime($query->date_created)), date("h:i:s a", strtotime($query->date_created)), $query->type, $query->remarks, $query->status);
    } else {
      return 0;
    }
  }

