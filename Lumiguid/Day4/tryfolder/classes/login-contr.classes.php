<?php

class LoginContr extends SignUp{
    private $uid;
    private $pwd;

    public function _construct($uid,$pwd,){
        $this->uid = $uid;
        $this->pwd = $pwd;

    }
    public function LoginUser(){
        if($this->emptyInput()==false){


            header("location:../index.php?error=emptyinputs");
            exit();
        }
        $this->getUser($this->uid, $this->pwd);
    }
    private function emptyInput(){
        $result;
        if(empty( $this->uid ||  $this->pwd)){
            $result = false;
        }else{
            $result = true;
        }
        return $result;
    }
}