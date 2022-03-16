<?php
include '../database.inc.php';

function checkUsernameOrEmailDuplicate($conn, string $username = '', string $email = '')
{
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
        mysqli_close($conn);
        throw new Exception($msg);
    };

    return;
}

function create(
    $conn,
    string $name = '',
    string $email = '',
    string $username = '',
    string $address = '',
    string $contactNumber,
    string $birthDate,
    string $password = '',
) {
    try {
        $msg = '';

        checkUsernameOrEmailDuplicate($conn, $username, $email);

        $sqlStatement = "INSERT INTO `users`( `name`, `email`, `username`, `address`, `contact_number`, `birth_date`, `password`) 
            VALUES ('$name','$email','$username','$address', '$contactNumber', '$birthDate', '$password')";

        if (mysqli_query($conn, $sqlStatement)) {
            $msg = "Welcome " . $name . "!";
        } else {
            $msg = "Error: Something went wrong...";
        }

        $id = $conn->insert_id;

        mysqli_close($conn);

        return json_encode(array(
            'result' => array(
                'msg' => $msg,
                'id' => $id
            ),
        ));
    } catch (Exception $e) {
        return json_encode(array(
            'error' => array(
                'msg' => $e->getMessage()
            ),
        ));
    }
}

function retrieve($conn, string $username = '', string $password = '')
{
    try {
        $sqlStatement = "SELECT * FROM users WHERE ( username='$username' OR email = '$username') AND password='$password' LIMIT 1";

        $result = mysqli_query($conn, $sqlStatement);

        if (mysqli_num_rows($result) == 0) {
            throw new Exception('Wrong Credentials!');
        }

        mysqli_close($conn);

        $remove = ['password'];

        $result = array_diff_key(mysqli_fetch_assoc($result), array_flip($remove));

        return json_encode($result);
    } catch (Exception $e) {
        return json_encode(array(
            'error' => array(
                'msg' => $e->getMessage()
            ),
        ));
    }
}

function update(
    $conn,
    string $id = '',
    string $name = '',
    string $email = '',
    string $username = '',
    string $address = '',
    string $contactNumber,
    string $birthDate,
) {
    try {
        checkUsernameOrEmailDuplicate($conn, $username, $email);

        $sqlStatement = "UPDATE `users` SET `name`='$name',`email`='$email',`username`='$username',`address`='$address',`contact_number`='$contactNumber',`birth_date`='$birthDate' WHERE id=$id";

        if (!mysqli_query($conn, $sqlStatement)) {
            throw new Exception('Something went wrong!');
        }

        $sqlStatement = "SELECT `id`, `name`, `email`, `username`, `address`, `contact_number`, `birth_date` FROM users WHERE id=$id";

        $result = mysqli_query($conn, $sqlStatement);

        if (mysqli_num_rows($result) == 0) {
            throw new Exception('User not found!');
        }

        mysqli_close($conn);

        return json_encode(mysqli_fetch_assoc($result));
    } catch (Exception $e) {
        return json_encode(array(
            'error' => array(
                'msg' => $e->getMessage()
            ),
        ));
    }
}

if (isset($_GET['action']) && !empty(isset($_GET['action']))) {
    $action = $_GET['action'];

    switch ($action) {
        case "signup": {
                echo create($conn, $_POST['name'], $_POST['email'], $_POST['username'], $_POST['address'], $_POST['contact_number'], $_POST['birth_date'], $_POST['password']);

                return;
            }
            break;

        case "login": {
                echo retrieve($conn, $_POST['username'], $_POST['password']);

                return;
            }
            break;

        case "update": {
                echo update($conn, $_POST['id'], $_POST['name'], $_POST['email'], $_POST['username'], $_POST['address'], $_POST['contact_number'], $_POST['birth_date']);

                return;
            }
            break;

        default: {
                return 'somethin went wrong!';
            }
    }
}
