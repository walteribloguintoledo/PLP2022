<?php

function view(){
    $query = ORM::for_table('exam')->find_many();
    return $query;
  }