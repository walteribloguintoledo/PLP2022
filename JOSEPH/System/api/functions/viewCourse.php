<?php

function viewCourse(){
    $query = ORM::for_table('examCategory')->distinct()->select('course')->find_many();
    return $query;
}