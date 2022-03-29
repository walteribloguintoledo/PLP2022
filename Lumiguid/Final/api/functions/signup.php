<?php

  //check if email address already exists
  function checkEmail($email){
    $query = ORM::for_table('users')->where('email', $email)->find_one();
    return $query;
  }
//insert
  function insertUser($email, $password, $lastname, $firstname, $age, $address){
    $person = ORM::for_table('users')->create();
    $person->set('email', $email);
    $person->set('password', $password);
    $person->set('lastname', $lastname);
    $person->set('firstname', $firstname);
    $person->set('age', $age);
    $person->set('address', $address);
    $person->save();

  }
