<?php
	function login($username, $password) {
		$user = ORM::for_table('users')->find_one(array(
			'username' => $username,
			'password' => $password
		));

		foreach ($user as $data) {
			return $user_data = array(
				$data->username,
				$data->password,
				$data->full_name,
				$data->address,
				$data->birthdate,
				$data->contact_no,
			);
		}

		echo "TSK TSK";
	}