<!DOCTYPE html>
<html>

<head>
    <title>LOGIN</title>

    <link rel="stylesheet" type="text/css" href="login.css">
</head>

<body>

     <form action="login.php" method="post">
        <h2>LOGIN</h2>

        <?php if (isset($_GET['error'])) { ?>

            <p class="error"><?php echo $_GET['error']; ?></p>

        <?php } ?>

        <label>User Name</label>

        <input type="text" name="uname" placeholder="User Name"><br>

        <label>Password</label>

        <input type="password" name="password" placeholder="Password"><br> 

        <button type="submit">Login</button>

     </form>
</body>
<?php 

session_start(); 

include "db_connection.php";

if (isset($_POST['uname']) && isset($_POST['password'])) {

    function validate($data){

       $data = trim($data);

       $data = stripslashes($data);

       $data = htmlspecialchars($data);

       return $data;

    }

    $uname = validate($_POST['uname']);

    $pass = validate($_POST['password']);

    if (empty($uname)) {

        header("http://ricojay.com/practise/login.php?error=User Name is required");

        exit();

    }else if(empty($pass)){

        header("http://ricojay.com/practise/login.php?error=Password is required");

        exit();

    }else{

        $sql = "SELECT * FROM users WHERE user_name='$uname' AND password='$pass'";

        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) === 1) {

            $row = mysqli_fetch_assoc($result);

            if ($row['user_name'] === $uname && $row['password'] === $pass) {

                echo "Logged in!";

                $_SESSION['user_name'] = $row['user_name'];

                $_SESSION['name'] = $row['name'];

                $_SESSION['id'] = $row['id'];

                header("Location: home.php");

                exit();

            }else{

                header("http://ricojay.com/practise/login.php?error=Incorect User name or password");

                exit();

            }

        }else{

            header("http://ricojay.com/practise/login.php?error=Incorect User name or password");

            exit();

        }

    }

}else{

    header("http://ricojay.com/practise/login.php");

    exit();

}
?>
</html>