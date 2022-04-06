<?php
  function login($username, $password){
    $query = ORM::for_table('users')->where('username', $username)->where('password', $password)->find_many();

    foreach($query as $view){
      return $user_data = array(
        "id" => $view->id,
        "firstname" => $view->firstname,
        "lastname" => $view->lastname,
        "username" => $view->username,
        "password" => $view->password); 
    }
  }