<?php

function create($name, $username, $email, $address, $birthDate, $contactNumber, $password)
{
    $person = ORM::for_table('users')->create();
    $person->set('name', $name);
    $person->set('username', $username);
    $person->set('email', $email);
    $person->set('address', $address);
    $person->set('birth_date', $birthDate);
    $person->set('contact_number', $contactNumber);
    $person->set('password', $password);
    $person->save();
}
