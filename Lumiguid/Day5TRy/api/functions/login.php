<?php
<<<<<<< HEAD
  function login($email, $password){
    $query = ORM::for_table('users')->where('email', $email)->where('password', $password)->find_many();

    foreach($query as $q){
      return $user_data = array($q->updateId, $q->email, $q->password, $q->lastname, $q->firstname, $q->age,$q->address);
    }
  }
=======
  function login($uname, $pass){
    $query = ORM::for_table('users')->where('username', $uname)->where('password', $pass)->find_many();

    foreach($query as $q){
      return $user_data = array($q->fullname, $q->username, $q->email, $q->address, $q->birthday, $q->contact);
    }
  }
>>>>>>> cde9f2aafbf526166244889b5f1c1270978980a1
