<?php

function addCategory($uid, $course, $subject){
    $q = ORM::for_table('examCategory')->create();
    $q->set('uid', $uid);
    $q->set('course', $course);
    $q->set('subject', $subject);
    $q->save();
}