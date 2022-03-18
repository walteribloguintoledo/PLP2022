<?php
  function login($uname, $pass){
    $query = ORM::for_table('users')->where('username', $uname)->where('password', $pass)->find_many();

    foreach($query as $q){
      return $user_data = array($q->fullname, $q->username, $q->email, $q->address, $q->birthday, $q->contact);
    }
  }