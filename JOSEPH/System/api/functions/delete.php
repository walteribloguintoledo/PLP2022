<?php

function deleteUser($userId){
    $person = ORM::for_table('exam')->where('id', $userId)->delete_one();
    return $person;
  }