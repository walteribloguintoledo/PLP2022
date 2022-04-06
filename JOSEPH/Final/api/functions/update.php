<?php

function checkUpdateEmail($email){
    $query = ORM::for_table('users')->where('email', $email)->find_one();
    return $query;
}

function update($updateId, $firstname, $lastname, $username, $email, $password, $age, $birthdate, $contact){
    $update = ORM::for_table('users')->where('id', $updateId)->find_one();
    $update->set('firstname', $firstname);
    $update->set('lastname', $lastname);
    $update->set('username', $username);
    $update->set('email', $email);
    $update->set('password', $password);
    $update->set('age', $age);
    $update->set('birthdate', $birthdate);
    $update->set('contact', $contact);
    $update->save();
}