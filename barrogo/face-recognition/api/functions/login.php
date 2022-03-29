<?php
  function login($userID){
    $query = ORM::for_table('users')->where('userID', $userID)->find_many();

    foreach($query as $q){
      return $user_data = array($q->userID, $q->fullname, $q->username, $q->email, $q->address, $q->birthday, $q->contact);
    }
  }