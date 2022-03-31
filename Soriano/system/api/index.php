<?php

include 'functions.loader.php';

$app = new Slim();

$app->post('/scan-qr', function () {
    $appVariables = new AppVariables();
    $id = $_POST['id'];

    $result = ORM::for_table('users')->find_one(intval($id));

    if ($result && $result->id() === $id) {
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
        $appVariables->message = "Invalid Qr Code!";
    }

    $response = array(
        "verified" => $appVariables->verified,
        "error" => $appVariables->error,
        "message" => $appVariables->message,
        "result" => $result,
    );

    echo json_encode($response);
});

$app->post('/update/:id', function ($id) {
    $appVariables = new AppVariables();

    $result = update($id, $_POST['name'], $_POST['address'], $_POST['birth_date'], $_POST['contact_number']);

    if (!$result) {
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

        $dir = 'uploads/images/' . $person->id();

        mkdir($dir);

        foreach ($_POST["photos"] as $name => $photo) {
            file_put_contents($dir . '/' . $name . '.png', file_get_contents($photo));
        }

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

$app->post('/attendance', function () {
    $timezone = new DateTime("now", new DateTimeZone('Asia/Manila'));
    $currentDate = $timezone->format('Y-m-d');
    $currentTime = $timezone->format('h:i:s A');
    $timeRange = [
        'time_in' => strtotime('9:15 AM'),
        'time_out' => strtotime('6:00 PM')
    ];
    $userId = $_POST['id'];
    $response = [];

    $result = ORM::for_table('attendances')->where('user_id', $userId)->where('date', $currentDate)->find_one();

    if (is_bool($result)) {
        $attendance = ORM::for_table('attendances')->create();

        $attendance->time_in = $currentTime;
        $attendance->date = $currentDate;
        $attendance->user_id = $userId;
        $attendance->remarks = strtotime($currentTime) > $timeRange["time_in"] ? "Late Time-In" : (strtotime($currentTime) == $timeRange["time_in"] ? "On-Time" : null);

        $attendance->save();

        $response = array(
            "alert" => "success",
            "message" => "Time-In successful for ".$timezone->format('F d, Y h:i:s A').". ".($attendance->remarks ? "(".$attendance->remarks.")" : ""),
        );
    } else if ($result->time_out) {
        $response = array(
            "alert" => "info",
            "message" => "You already have an attendance for ".$timezone->format('F d, Y').".",
        );
    } else {
        $result->time_out = $currentTime;
        $remarks = "Early Time-Out";
        $result->remarks = strtotime($currentTime) < $timeRange["time_out"] ? ($result->remarks ? $result->remarks . ", " . $remarks : $remarks) : null;

        $result->save();

        $response = array(
            "alert" => "success",
            "message" => "Time-Out successful for ".$currentDate.". ".($result->remarks ? "(".$remarks.")" : ""),
        );
    }

    echo json_encode($response);
});

// $app->post('/user/profile-picture/update', function () {
//     $appVariables = new AppVariables();

//     $person = updateProfilePicture($_POST['id'], $_POST['photo']);

//     if ($person !== false) {
//         $appVariables->verified = 1;
//         $appVariables->error = 0;
//         $appVariables->message = "Successful";
//     } else {
//         $appVariables->message = "Error";
//     }

//     $response = array(
//         "verified" => $appVariables->verified,
//         "error" => $appVariables->error, 
//         "message" => $appVariables->message
//     );

//     echo json_encode($response);
// });

$app->run();
