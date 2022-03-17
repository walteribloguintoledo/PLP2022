<?php

include "../db/db_conn.php";

if(isset($_POST['submit'])){
    $email = $_POST['emaill'];
    $password =$_POST['passwordd'];
    $last_name = $_POST['lastnamee'];
    $first_name =  $_POST['firstnamee'];
    $age =  $_POST['DOB'];
    $address = $_POST['addresss'];

    $sql = "INSERT INTO users VALUES ('$email','$password','$last_name','$first_name','$age','$address')";  

    if(mysqli_query($conn, $sql)){
        echo "<h3>data stored in a database successfully." 
            . " Please browse your localhost php my admin" 
            . " to view the updated data</h3>";
    } else{
        echo "ERROR: Hush! Sorry $sql. " 
            . mysqli_error($conn);
    }
}

?>