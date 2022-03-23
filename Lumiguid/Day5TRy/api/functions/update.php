<?php
<<<<<<< HEAD
function updateDataWithPass($updateId,$email, $password, $lastname, $firstname, $age, $address){
  $query = ORM::for_table('users')->where('id', $updateId)->find_many();

  foreach($query as $q){
    $q->set('id', $updateId);
    $q->set('email', $email);
    $q->set('password', $password);
    $q->set('lastname', $lastname);
    $q->set('firstname', $firstname);
    $q->set('age', $age);
    $q->set('address', $address);
    $q->save();
    return $user_data = array($q->updateId, $q->email, $q->password, $q->lastname, $q->firstname, $q->age,$q->address);
=======
//update data with password
function updateDataWithPass($name, $uname, $email, $address, $bday, $contact, $pass){
  $query = ORM::for_table('users')->where('username', $uname)->where('email', $email)->find_many();

  foreach($query as $q){
    $q->set('fullname', $name);
    $q->set('address', $address);
    $q->set('birthday', $bday);
    $q->set('contact', $contact);
    $q->set('password', $pass);
    $q->save();
    return $user_data = array($q->fullname, $q->username, $q->email, $q->address, $q->birthday, $q->contact);
  }
}

//update data
function updateData($name, $uname, $email, $address, $bday, $contact){
  $query = ORM::for_table('users')->where('username', $uname)->where('email', $email)->find_many();

  foreach($query as $q){
    $q->set('fullname', $name);
    $q->set('address', $address);
    $q->set('birthday', $bday);
    $q->set('contact', $contact);
    $q->save();
    return $user_data = array($q->fullname, $q->username, $q->email, $q->address, $q->birthday, $q->contact);
>>>>>>> cde9f2aafbf526166244889b5f1c1270978980a1
  }
}