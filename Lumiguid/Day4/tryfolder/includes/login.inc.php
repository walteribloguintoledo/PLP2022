<?php

    if(isset($_POST["submit"])){
        $uid = $_POST["uid"];
        $pwd = $_POST["uid"];

        
        //instaniate SignCOntroller Class
        include "../classes/dbh.classes.php";
        include "../classes/login.classes.php";
        include "../classes/loginContr-classes.php";
        $login = new SignupContr($uid,$pwd);
        // Running error handlers and user signup
        $login->loginUser();
        // 
        header ("location: ../indext.php?error=none");
    }