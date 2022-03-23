<?php

	function deleteUser($id) {
		$user = ORM::for_table('users')->where('id', $id)->find_one();
		$user->delete();
	}