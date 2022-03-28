<?php
function updateDataWithPass($updateId,$email, $password, $lastname, $firstname, $age, $address){
  // $query = ORM::for_table('users')->where('id', $updateId)->find_one();
  // $query->set('email', $email);
  // $query->set('password', $password);
  // $query->set('lastname', $lastname);
  // $query->set('firstname', $firstname);
  // $query->set('age', $age);
  // $query->set('address', $address);
  // $query->save();
  try {
    $query = ORM::for_table('users')->where('id', $updateId)->find_one();
    $query->set('email', $email);
    $query->set('password', $password);
    $query->set('lastname', $lastname);
    $query->set('firstname', $firstname);
    $query->set('age', $age);
    $query->set('address', $address);
    $query->save();
    return true;
  } catch (Exception $e) {
    //echo 'Caught exception: ',  $e->getMessage(), "\n";
    return false;
  }
}