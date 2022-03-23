<?php
<<<<<<< HEAD
=======
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
>>>>>>> cde9f2aafbf526166244889b5f1c1270978980a1

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

<<<<<<< HEAD
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
=======
  //insert data
  function insertUser($name, $uname, $email, $address, $bday, $contact, $password){
    $person = ORM::for_table('users')->create();
    $person->set('fullname', $name);
    $person->set('username', $uname);
    $person->set('email', $email);
    $person->set('address', $address);
    $person->set('birthday', $bday);
    $person->set('contact', $contact);
    $person->set('password', $password);
>>>>>>> cde9f2aafbf526166244889b5f1c1270978980a1
    $person->save();
  }