<?php

    class Signup extends Dbh {
        protected function setUser($uid,$email){
            $stmt = $this->connect()->prepare('INSERT INTO users(users_id, users_pwd, users_email) VALUES (?,?,?');
            
            $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
            if(!$stmt->execute(array($uid,$hashedPwd,$email))){
                $stmt = null;
                header("location: ../index.php?errors=stmtfailed");
                exit();
            }
            $stmt = null;
        }
        
        
        protected function checkUser($uid,$email){
            $stmt = $this->connect()->prepare('SELECT users_id FROM users WHERE users_uid =? OR users_email = ?;');
            
            if(!$stmt->execute(array($uid,$email))){
                $stmt = null;
                header("location: ../index.php?errors=stmtfailed");
                exit();
            }
            $resultCheck;
            if($stmt->rowCount() > 0){
                $resultCheck = false;
            }else{
                $resultCheck = true;
            }
            return $resultCheckl;
        }
    }