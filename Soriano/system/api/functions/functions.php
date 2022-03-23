<?php

function find($key, $value) 
{
    return ORM::for_table('users')->where($key, $value)->find_one();
}

function updateProfilePicture($id, $photo)
{
    $person = find('id', $id);
    
    $person->set('photo', serialize($photo));
    $person->save();
}

function checkUsernameOrEmailDuplicate($username, $email)
{
    $error = 0;
    $message = '';

    if (find('username', $username)) {
        $error = 1;
        $message = 'Username is already taken!';
    } else if (find('email', $email)) {
        $error = 1;
        $message = 'Email is already taken!';
    }

    return array(
        'error' => $error,
        'message' => $message
    );
}

function update($id, $name, $address, $birthDate, $contactNumber)
{
    $person = find('id', $id);

    if (! $person) return false;

    $person->set('name', $name);
    $person->set('address', $address);
    $person->set('birth_date', $birthDate);
    $person->set('contact_number', $contactNumber);

    $person->save();
}

function retrieve($username)
{
    $person = find('username', $username);

    return $person;
}

function create($name, $username, $email, $address, $birthDate, $contactNumber, $password, $photo)
{
    $person = ORM::for_table('users')->create();
    $person->set('name', $name);
    $person->set('username', $username);
    $person->set('email', $email);
    $person->set('address', $address);
    $person->set('birth_date', $birthDate);
    $person->set('contact_number', $contactNumber);
    $person->set('password', encrpyt($password));
    $person->set('photo', $photo);
    $person->save();

    return $person;
}

function encrpytionIV() { return '1234567891011121'; }

function encrpytionKey() { return hex2bin('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'); }

function options() { return 0; }

function cipherMethod() { return "AES-128-CTR"; }

function encrpyt($value)
{
    return openssl_encrypt($value, cipherMethod(), encrpytionKey(), options(), encrpytionIV());
}

function decrypt($value)
{
    return openssl_decrypt($value, cipherMethod(), encrpytionKey(), options(), encrpytionIV());
}
