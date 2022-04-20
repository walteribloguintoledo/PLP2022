<?php

function viewUser(){
    $query = ORM::for_table('examinee')->find_many();
    return $query;
  }