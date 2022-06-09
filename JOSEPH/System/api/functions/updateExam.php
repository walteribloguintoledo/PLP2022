<?php

function updateExam($updateId, $updateExam_ID, $updateExam_Key, $updateExam_Value, $updateExam_Level){
    $update = ORM::for_table('exam')->where('id', $updateId)->find_one();
    $update->set('exam_id', $updateExam_ID);
    $update->set('exam_key', $updateExam_Key);
    $update->set('exam_value', $updateExam_Value);
    $update->set('exam_level', $updateExam_Level);
    $update->save();
}