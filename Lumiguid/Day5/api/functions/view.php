<?php


function view(){
    $query = ORM::for_table('users')->find_many();

    foreach($query as $q){
      return $user_data = array($q->updateId, $q->email, $q->password, $q->lastname, $q->firstname, $q->age,$q->address);
    }
  }