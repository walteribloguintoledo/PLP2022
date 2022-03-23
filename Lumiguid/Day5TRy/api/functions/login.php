<?php
  function login($email, $password){
    $query = ORM::for_table('users')->where('email', $email)->where('password', $password)->find_many();

    foreach($query as $q){
      return $user_data = array($q->updateId, $q->email, $q->password, $q->lastname, $q->firstname, $q->age,$q->address);
    }
  }
