<?php
	function login ($username, $password) {
		$user = ORM::for_table('users')->where('username', $username)->where('password', $password)->find_many();

		foreach ($user as $data) {
			return $user_data = array(
				$data->id,
				$data->username,
				$data->password,
			);
		}
	}