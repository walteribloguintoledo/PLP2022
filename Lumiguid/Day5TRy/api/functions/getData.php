<?php
  function login($id){
    $query = ORM::for_table('users')->where('id', $id)->find_many();

    foreach($query as $q){
      return $user_data = array($q->updateId, $q->email, $q->password, $q->lastname, $q->firstname, $q->age,$q->address);
    }
  }
