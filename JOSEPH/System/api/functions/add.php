<?php

function checkQuestion($question){
    $query = ORM::for_table('exam')->where('question', $question)->find_one();
    return $query;
}

function addQuestion($question, $choice1, $choice2, $choice3, $choice4, $answer, $category, $subject, $level){
    $q = ORM::for_table('exam')->create();
    $q->set('question', $question);
    $q->set('choice1', $choice1);
    $q->set('choice2', $choice2);
    $q->set('choice3', $choice3);
    $q->set('choice4', $choice4);
    $q->set('answer', $answer);
    $q->set('category', $category);
    $q->set('subject', $subject);
    $q->set('level', $level);
    $q->save();
}