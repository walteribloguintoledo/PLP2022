<?php

function addExam($exam_id, $exam_key, $exam_value, $exam_level){
    $q = ORM::for_table('exam')->create();
    $q->set('exam_id', $exam_id);
    $q->set('exam_key', $exam_key);
    $q->set('exam_value', $exam_value);
    $q->set('exam_level', $exam_level);
    $q->save();
}