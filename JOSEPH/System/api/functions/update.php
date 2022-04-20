<?php

function checkUpdateQuestion($question){
    $query = ORM::for_table('exam')->where('question', $question)->find_one();
    return $query;
}

function updateQuestion($updateId, $updateQuestion,  $updatChoice1, $updatChoice2, $updatChoice3, $updatChoice4, $updateAnswer, $updateCategory, $updateSubject, $updateLevel){
    $update = ORM::for_table('exam')->where('id', $updateId)->find_one();
    $update->set('question', $updateQuestion);
    $update->set('choice1', $updatChoice1);
    $update->set('choice2', $updatChoice2);
    $update->set('choice3', $updatChoice3);
    $update->set('choice4', $updatChoice4);
    $update->set('answer', $updateAnswer);
    $update->set('category', $updateCategory);
    $update->set('subject', $updateSubject);
    $update->set('level', $updateLevel);
    $update->save();
}