<?php

function updateCategory($updateID, $updateCourse, $updateSubject){
    $update = ORM::for_table('examCategory')->where('id', $updateID)->find_one();
    $update->set('id', $updateID);
    $update->set('course', $updateCourse);
    $update->set('subject', $updateSubject);
    $update->save();
}