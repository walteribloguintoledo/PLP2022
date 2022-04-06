<?php
  function getData($id){
    $query = ORM::for_table('users')->where('id', $id)->find_one();
    return $query;
    foreach($query as $q){
      return $user_data = array($q->id, $q->firstname, $q->lastname, $q->username, $q->email, $q->password, $q->age, $q->birthdate, $q->contact);
    }
  }
