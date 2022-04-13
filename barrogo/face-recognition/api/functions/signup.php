<?php
  //check if username already exists
  function checkUID($uid){
  $query = ORM::for_table('users')->where('uid', $uid)->count();

    if ($query > 0) {
      // output data of each row
      return 1;
    } else{
      return 0;
    }
  }

  //insert data
  function insertUser($uid, $name, $dept){
    $person = ORM::for_table('users')->create();
    $person->set('uid', $uid);
    $person->set('fullname', $name);
    $person->set('department', $dept);
    $person->save();
    return $added = array($person->id, $person->uid, $person->fullname, $person->department);
  }