<?php
include "db/db_conn.php";

$delete = $_POST['del_Id'];
$query = "DELETE FROM users WHERE id='$delete'";
$results =mysqli_query($conn,$query);

if($results){
    echo json_encode('Your record has been Deleted') ;
}else{
    echo json_encode('Please Check Your Query') ;
}