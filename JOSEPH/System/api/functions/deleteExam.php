<?php

function deleteQuestion($examID){
    $question = ORM::for_table('exam')->where('id', $examID)->delete_many();
    return $question;
  }