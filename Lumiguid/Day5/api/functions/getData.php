<?php
  function getdata($id){
    $query = ORM::for_table('users')->where('id', $id)->find_one();
    return $query;
    // foreach($query as $q){
    //   return $user_data = array($q->id, $q->email, $q->password, $q->lastname, $q->firstname, $q->age,$q->address);
    // }
  }
