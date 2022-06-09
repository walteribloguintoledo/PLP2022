<?php
  function getCategory($id){
    $query = ORM::for_table('examCategory')->where('id', $id)->find_one();
    return $query;
  }