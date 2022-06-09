<?php

function viewCategory(){
    $query = ORM::for_table('examCategory')->find_many();
    return $query;
  }