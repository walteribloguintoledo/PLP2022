<?php

include 'functions.loader.php';

$app = new Slim();

$app->post('/login', function () {
    global $conn;
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sqlStatement = "SELECT * FROM users WHERE ( username='$username' OR email = '$username') AND password='$password' LIMIT 1";

    $result = mysqli_query($conn, $sqlStatement);

    if (mysqli_num_rows($result) == 0) {
        echo json_encode(array(
            'error' => array(
                'msg' => 'Error!'
            ),
        ));

        return;
    }

    mysqli_close($conn);

    $remove = ['password'];

    $result = array_diff_key(mysqli_fetch_assoc($result), array_flip($remove));

    echo json_encode($result);

    return;
});

$app->post('/signup', function () {
    global $conn;
    $name = $_POST['name'];
    $email = $_POST['email'];
    $username = $_POST['username'];
    $address = $_POST['address'];
    $contactNumber = $_POST['contact_number'];
    $birthDate = $_POST['birth_date'];
    $password = $_POST['password'];
    $msg = '';

    $result = mysqli_query($conn, "SELECT id, email, username FROM users WHERE ( username='$username' OR email = '$email')");

    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_array($result)) {
            if ($row['username'] == $username) {
                $msg = 'This username is already taken.';
                break;
            } else if ($row['email'] == $email) {
                $msg = 'This email is already taken.';
                break;
            } 
        }
    }

    if (! empty($msg)) {
        echo json_encode(array(
            'error' => array(
                'msg' => $msg
            ),
        ));

        return;
    };

    $sqlStatement = "INSERT INTO `users`( `name`, `email`, `username`, `address`, `contact_number`, `birth_date`, `password`) 
    VALUES ('$name','$email','$username','$address', '$contactNumber', '$birthDate', '$password')";

    if (mysqli_query($conn, $sqlStatement)) {
        $msg = "Welcome " . $name . "!";
    } else {
        $msg = "Error: Something went wrong...";
    }

    $id = $conn->insert_id;

    mysqli_close($conn);

    echo json_encode(array(
        'result' => array(
            'msg' => $msg,
            'id' => $id
        ),
    ));

    return;
});

$app->run();
