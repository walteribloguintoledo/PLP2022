<?php
  //check if the user already time in
  function checkTimeIn($id, $date){
    $query = ORM::for_table('attendance')->where('userID', $id)->where('date', $date)->count();

    if ($query > 0) {
      // output data of each row
      return 1;
    } else{
      return 0;
    }
  }

  //check if the user already time out
  function checkTimeOut($id, $date){
    $query = ORM::for_table('attendance')->where('userID', $id)->where_not_null('timeOut')->where('date', $date)->count();

    if ($query > 0) {
      // output data of each row
      return 1;
    } else{
      return 0;
    }
  }

  // get last attendance
  function last_attendance($id){
    $query = ORM::for_table('attendance')->where('userID', $id)->order_by_desc('id')->find_one();

    if($query){
      if($query->timeOut == null){
        return $user_data = array($query->userID, date("h:i:s a", strtotime($query->timeIn)), $query->timeOut, date("F d, Y", strtotime($query->date)), $query->remarks);
      }else{
        return $user_data = array($query->userID, date("h:i:s a", strtotime($query->timeIn)), date("h:i:s a", strtotime($query->timeOut)), date("F d, Y", strtotime($query->date)), $query->remarks);
      }
    } else {
      return 0;
    }

  }


  // time in
  function time_in($id, $time, $date, $remarks){
    $person = ORM::for_table('attendance')->create();
    $person->set('userID', $id);
    $person->set('timeIn', $time);
    $person->set('date', $date);
    $person->set('remarks', $remarks);
    $person->save();
    return $user_data = array(date("h:i:s a", strtotime($person->timeIn)), date("F d, Y", strtotime($person->date)), $person->remarks);
  }

  // time out
  function time_out($id, $time, $date){
    $person = ORM::for_table('attendance')->where('userID', $id)->where('date', $date)->find_one();
    $person->timeOut = $time;
    if(date("H") < 18){
      $remarks = $person->remarks .", ". "Early Time Out";
    } else{
      $remarks = $person->remarks .", ". "Approved";
    }
    $person->remarks = $remarks;
    $person->save();
    return $user_data = array(date("h:i:s a", strtotime($person->timeOut)), date("F d, Y", strtotime($person->date)), $person->remarks);
  }