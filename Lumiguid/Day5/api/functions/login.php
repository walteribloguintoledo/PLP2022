<?php
  function login($email, $password){
    $query = ORM::for_table('users')->where('email', $email)->where('password', $password)->find_many();

    foreach($query as $q){
      return $user_data = array(
        "id" => $q->id, 
        "email" => $q->email, 
        "password" =>$q->password, 
        "lastname" =>$q->lastname, 
        "firstname" =>$q->firstname, 
        "age" =>$q->age,
        "address" =>$q->address,
        "userType"=>$q->userType);
        
    }
  }
