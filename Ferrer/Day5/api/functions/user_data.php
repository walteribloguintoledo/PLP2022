<?php

	function getData($id) {
		$user = ORM::for_table('users')->where('id', $id)->find_many();

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
	}