<?php
function deleteUser($userId){
    $person = ORM::for_table('users')->where('id', $userId)->delete_many();

    if ($person) {
        // output data of each row
        return 1;
      } else{
        return 0;
      }
    

  }

