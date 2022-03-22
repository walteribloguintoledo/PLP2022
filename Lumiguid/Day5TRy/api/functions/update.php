<?php
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
  }
}