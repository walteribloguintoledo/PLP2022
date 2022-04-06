<?php

function deleteUser($userId){
    $person = ORM::for_table('users')->where('id', $userId)->delete_many();
    return $person;
  }