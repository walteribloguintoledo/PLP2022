<?php

function viewSubject(){
    $query = ORM::for_table('examCategory')->where('course', 'BSIT')->find_many();
    return $query;
}