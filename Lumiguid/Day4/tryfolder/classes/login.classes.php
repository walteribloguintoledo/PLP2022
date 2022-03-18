<?php

    class Login extends Dbh {
        protected function getUser($uid,$password){
            $stmt = $this->connect()->prepare('SELECT users_pwd FROM users WHERE users_id = ? or users_email = ?;');

            if(!$stmt->execute(array($uid,$pwd))){
                $stmt = null;
                header("location: ../index.php?errors=stmtfailed");
                exit();
            }
            if($stmt->rowCount() == 0){
                $stmt = null;
                header("location: ../index.php?error=usersnotfound");
                exit();
            }

            $pwdHashed = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $checkPwd = password_verify($pwd,$pwdHashed[0]["users_password1"]);

            if($checkPwd == false){
                $stmt = null;
                header("location: ../index.php?error=wrongpassword");
                exit();
            }else if($checkPwd==true){
                $stmt = $this->connect()->prepare('SELECT users_pwd FROM users WHERE users_id = ? or users_email = ?;');
                
                if(!$stmt->execute(array($uid,$uid,$pwd))){
                    $stmt = null;
                    header("location: ../index.php?error=stmtfailed");
                    exit();
                }
                if($stmt->rowCount() == 0){
                    $stmt = null;
                    header("location: ../index.php?error=usersnotfound");
                    exit();
                }
                $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

                session_start();
                $_SESSION["userid"] = $user[0]["user_id"];
                $_SESSION["useruid"] = $user[0]["user_uid"];
            }
            $stmt = null;
        }
    }