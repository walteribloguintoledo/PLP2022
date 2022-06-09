<?php

function viewRanking(){
    $query = ORM::for_table('examineeRanking')->find_many();
    return $query;
  }