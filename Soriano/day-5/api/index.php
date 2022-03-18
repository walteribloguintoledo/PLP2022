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

    $verified = 0;
    $error = 1;
    $response = array();

    create($name, $username, $email, $address, $birthDate, $contactNumber, $password);

    // if ($person) {
    //     echo json_encode(array(
    //         'result' => array(
    //             'verified' => 1
    //         ),
    //     ));
    // } else {
    //     echo json_encode(array(
    //         'result' => array(
    //             'verified' => 0
    //         ),
    //     ));
    // }

    $response = array(
        "verified" => $verified 
    );

    return;
});

$app->run();
