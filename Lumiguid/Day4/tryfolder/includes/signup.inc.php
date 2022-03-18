<?php

    if(isset($_POST["submit"])){
        $uid = $_POST["uid"];
        $pwd = $_POST["uid"];
        $pwdrepeat = $_POST["uid"];
        $email = $_POST["uid"];
        
        //instaniate SignCOntroller Class
        include "../classes/dbh.classes.php";
        include "../classes/signup.classes.php";
        include "../classes/signupContr-classes.php";
        $signup = new SignupContr($uid,$pwd,$pwdRepeat,$email);
        // Running error handlers and user signup
        $signup->signupUser();
        // 
        header ("location: ../indext.php?error=none");
    }