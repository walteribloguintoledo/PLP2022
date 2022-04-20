<?php
  function getData($id){
    $query = ORM::for_table('exam')->where('id', $id)->find_one();
    return $query;
  }
