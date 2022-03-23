<?php
	function updateData($id, $password, $full_name, $address, $birthdate, $contact_no) {
		$user = ORM::for_table("users")->where('id', $id)->find_one();
		$user->set(array(
			"password" => $password,
			"full_name" => $full_name,
			"address" => $address,
			"birthdate" => $birthdate,
			"contact_no" => $contact_no,
		));
		$user->save();
	}