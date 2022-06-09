<?php

function deleteCategory($categoryID){
    $question = ORM::for_table('examCategory')->where('id', $categoryID)->delete_many();
    return $question;
  }