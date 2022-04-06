<?php

function view(){
    $query = ORM::for_table('users')->find_many();
    return $query;
  }