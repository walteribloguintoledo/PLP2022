<?php
        
        include "db_conn.php";

      // Taking all 5 values from the form data(input)

        if(isset($_POST['submit'])){
            $email = $_POST['emaill'];
            $password =$_POST['passwordd'];
            $last_name = $_POST['lastnamee'];
            $first_name =  $_POST['firstnamee'];
            $age =  $_POST['DOBB'];
            $address = $_POST['addresss'];

        // Performing insert query execution
        $sql = "INSERT INTO users VALUES ('$email','$password','$last_name','$first_name','$age','$address')";         
        if(mysqli_query($conn, $sql)){
            echo "<h3>data stored in a database successfully." 
                . " Please browse your localhost php my admin" 
                . " to view the updated data</h3>"; 
  
            echo nl2br("\n$email\n $password\n "
                . "$last_name\n $first_name\n $age\n$address");
        } else{
            echo "ERROR: Hush! Sorry $sql. " 
                . mysqli_error($conn);
        }



        }else{
            header("location: ../signup.php");
        }


          
