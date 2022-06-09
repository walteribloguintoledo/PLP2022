<?php

function viewExam(){
    $query = ORM::for_table('exam')->find_many();
    return $query;
  }