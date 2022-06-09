<?php

function insertUser($firstname, $lastname, $email, $birthdate, $contact){
    $person = ORM::for_table('examinee')->create();
    $person->set('firstname', $firstname);
    $person->set('lastname', $lastname);
    $person->set('email', $email);
    $person->set('birthdate', $birthdate);
    $person->set('contact', $contact);
    $person->save();
}