<?php
session_start();
$con = mysqli_connect("localhost","root","","ernanie");

if(isset($_POST['save_select']))
{
    $name = $_POST['name'];
    $gender = $_POST['gender'];

    $query = "INSERT INTO demo (name,gender) VALUES ('$name','$gender')";
    $query_run = mysqli_query($con, $query);

    if($query_run)
    {
        $_SESSION['status'] = "Inserted Succesfully";
        header("Location: index.php");
    }
    else
    {
        $_SESSION['status'] = "Not Inserted";
        header("Location: index.php");
    }
}
?>