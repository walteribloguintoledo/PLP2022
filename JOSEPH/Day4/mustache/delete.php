<?php
include "db/db_conn.php";

$delete = $_POST['del_Id'];
$query = "DELETE FROM users WHERE id='$delete'";

if(mysqli_query($conn, $query)){
    echo json_encode(array('success' => 1));
}else if(mysqli_query($conn, $query)){
    echo json_encode(array('success' => 0));
}