<?php
  //insert data
  function attendance($id, $remarks){
    $person = ORM::for_table('attendance')->create();
    $person->set('userID', $id);
    $person->set('remarks', $remarks);
    $person->save();
  }