<?php

function checkUsername($username){
    $query = ORM::for_table('users')->where('username', $username)->find_one();
    return $query;
}

function checkEmail($email){
    $query = ORM::for_table('users')->where('email', $email)->find_one();
    return $query;
}

function insertUser($firstname, $lastname, $username, $email, $password, $age, $birthdate, $contact){
    $person = ORM::for_table('users')->create();
    $person->set('firstname', $firstname);
    $person->set('lastname', $lastname);
    $person->set('username', $username);
    $person->set('email', $email);
    $person->set('password', $password);
    $person->set('age', $age);
    $person->set('birthdate', $birthdate);
    $person->set('contact', $contact);
    $person->save();
}