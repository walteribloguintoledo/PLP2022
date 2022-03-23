<?php

  //check if email address already exists
  function checkEmail($email){
    $query = ORM::for_table('users')->where('email', $email)->count();

    if ($query > 0) {
      // output data of each row
      return 1;
    } else{
      return 0;
    }
  }

//insert
  function insertUser($email, $password, $lastname, $firstname, $age, $address){
    $person = ORM::for_table('users')->create();
    $q->set('email', $email);
    $q->set('password', $password);
    $q->set('lastname', $lastname);
    $q->set('firstname', $firstname);
    $q->set('age', $age);
    $q->set('address', $address);
    $q->save();
    $person->save();
  }