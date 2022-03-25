<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<?php
pre_r($_POST);
?>

    <form action="" method="POST">
        <p>First name: <input type="text" name="firstname" value=""></p>
        <p>Last name: <input type="text" name="lastname" value=""></p>
        <input type="submit" name="submit" value="Submit">
    </form>
</body>
</html>

<?php

function pre_r($array) {
    echo '<pre>';
    print_r($array);
    echo '<pre>';
}

?>