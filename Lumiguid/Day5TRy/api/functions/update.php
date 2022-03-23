<?php
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
  }
}