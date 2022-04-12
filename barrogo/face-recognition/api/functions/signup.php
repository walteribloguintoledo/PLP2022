<?php
  //check if username already exists
  function checkUsername($uname){
  $query = ORM::for_table('users')->where('username', $uname)->count();

    if ($query > 0) {
      // output data of each row
      return 1;
    } else{
      return 0;
    }
  }

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

  //insert data
  function insertUser($user_id, $name, $uname, $email, $address, $bday, $contact, $password){
    $person = ORM::for_table('users')->create();
    $person->set('user_id', $user_id);
    $person->set('fullname', $name);
    $person->set('username', $uname);
    $person->set('email', $email);
    $person->set('address', $address);
    $person->set('birthday', $bday);
    $person->set('contact', $contact);
    $person->set('password', $password);
    $person->save();
    return $person->id;
  }