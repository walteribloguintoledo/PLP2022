<?php

include 'functions.loader.php';

$app = new Slim();

$app->post('/update/:id', function ($id) {
    $appVariables = new AppVariables();

    $result = update($id, $_POST['name'], $_POST['address'], $_POST['birth_date'], $_POST['contact_number']);

    if (! $result) {
        $appVariables->verified = 1;
        $appVariables->error = 0;
        $appVariables->message = "Updated Successfuly";
    } else {
        $appVariables->message = "Error";
    }

    $response = array(
        "verified" => $appVariables->verified,
        "error" => $appVariables->error, 
        "message" => $appVariables->message,
    );

    echo json_encode($response);
});

$app->post('/login', function () {
    $appVariables = new AppVariables();

    $result = retrieve($_POST['username'], $_POST['password']);

    if ($result && decrypt($result->password) === $_POST['password']) {
        $appVariables->verified = 1;
        $appVariables->error = 0;
        $appVariables->message = "Successful";
        $result = array(
            "id" => $result->id,
            "name" => $result->name,
            "username" => $result->username,
            "email" => $result->email,
            "address" => $result->address,
            "birth_date" => $result->birth_date,
            "contact_number" => $result->contact_number,
            // "password" => decrypt($result->password),
        );
    } else {
        $appVariables->message = "Wrong Credentials!";
    }

    $response = array(
        "verified" => $appVariables->verified,
        "error" => $appVariables->error, 
        "message" => $appVariables->message,
        "result" => $result,
    );

    echo json_encode($response);
});

$app->post('/signup', function () {
    $appVariables = new AppVariables();
    $username = $_POST['username'];
    $email = $_POST['email'];

    $result = checkUsernameOrEmailDuplicate($username, $email);

    if (array_key_exists('error', $result) && $result["error"]) {
        $appVariables->message = $result["message"];
    } else {
        $person = create($_POST['name'], $username, $email, $_POST['address'], $_POST['birth_date'], $_POST['contact_number'], $_POST['password']);

        $appVariables->verified = 1;
        $appVariables->error = 0;
        $appVariables->message = "Successful";
        $appVariables->user_id = $person->id();
    }

    $response = array(
        "verified" => $appVariables->verified,
        "error" => $appVariables->error, 
        "message" => $appVariables->message,
        "user_id" => $appVariables->user_id,
    );

    echo json_encode($response);
});

$app->post('/user/profile-picture/update', function () {
    updateProfilePicture($_POST['id'], $_POST['photo']);
});

$app->run();
