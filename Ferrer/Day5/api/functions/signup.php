<?php

	// check if the username is already exist
	function checkUsername($username) {
		$user = ORM::for_table('users')->where('username', $username)->find_one();

		return $user;
	}

	function signup($username, $password, $full_name, $address, $birthdate, $contact_no) {
		$newUser = ORM::for_table('users')->create();

		$newUser->set(array(
			"username" => $username,
			"password" => $password,
			"full_name" => $full_name,
			"address" => $address,
			"birthdate" => $birthdate,
			"contact_no" => $contact_no,
		));
		$newUser->save();
	}
