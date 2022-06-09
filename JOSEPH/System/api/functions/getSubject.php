<?php
  function getSubject($id){
    $query = ORM::for_table('examCategory')->where('course', $course)->find_one();
    return $query;
  }