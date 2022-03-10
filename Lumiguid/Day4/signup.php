<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <link rel="stylesheet" type="text/css" href="css/style.css">
<title>Signup</title>
 <div class="header">
  <div class="inner_header">
    <div class="container-md">
      <div class="row">
        <div class="col-md-8">
          <h1>Lumiguid's Blog</h1>
        </div>
        <div class="col-md-4 p-3">
          <ul class="nav_link">
            <li><a href="index.php">HOME PAGE</a></li>
            <li><a href="login.php">LOGIN</a></li>
            <li><a href="signup.php">SIGNUP</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
 </div>
  <br><br><br><br>
  <hr>
</head>
<body class="bods">
  <div class="form_container" id="login">
    <div class="title_container">
      <h2>Please Enter Credentials to SignUp</h2>
    </div>
    <div class="row">
      <div>
        <form name="myForm" method="post" action="db/query.php">
          <div>
            <input type="text" name="emaill" id="email" placeholder="Email"/>
          </div>
          <div>
            <input type="password" name="passwordd" id="password" placeholder="Password"  />
          </div>
          <div>
            <input type="password" id="password2" placeholder="Re-type Password"  />
          </div>
          <div>
            <input type="text" name="firstnamee" id="firstname" placeholder="First Name" />
          </div>
          <div>
            <input type="text" name="lastnamee" id="lastname" placeholder="Last Name"  />
          </div>
          <div>
              <input type="date" name="DOBB" id = "DOB">
          </div>
          <div>
            <textarea type="text" name="addresss" id="address" placeholder="Address"></textarea>
          </div>
          <input type="submit" class="btnlogin" id="btnShow" value="DisplayDiv" />
          <br>
          <h2>
          </h2>
          <p>_________________________________________________________________________________________________</p>
        </form>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="title_container">
      <h2>Your Credentials</h2>
    </div>
      <p> Email: <span id = "display_email"></span></p>
      <p> First name: <span id = "display_firstname"></span></p>
      <p> Last name: <span id = "display_lastname"></span></p>
      <p> Age: <span id = "display_age"></span></p>   
      <p> Address: <span id = "display_address"></span></p>               
    </div>
  <div class="container">
      <div class="title_container">
        <h2>Please open console for reference</h2>
      </div>
      <div>
      <div><h5>Choose element to access:</h5></div>
          <div>
            <input type="number" name="loc1" id="loc1" value="" placeholder="0"/>
          </div>
          <div>
            <input type="number" name="loc2" id="loc2" value="" placeholder="0"  />
          </div>
          <input type="button" class="btnlogin" id="btnS" value="Search" />          
      </div>
  </div>
<style type="text/css">
  /*table design*/
      #tbl {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      #tbl td, #tbl th {
        border: 1px solid #ddd;
        padding: 8px;
      }

      #tbl tr:nth-child(even){background-color: #f2f2f2;}

      #tbl tr:hover {background-color: #ddd;}

      #tbl th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
      }
</style>     
    <script type="text/JavaScript">
//SignUp Page

      //Create a container DIV that will show input values on form submit
      $(document).ready(function(){
          $("#btnShow").click(function(){
            if( $('#email').val() == "" ) {
            alert( "Please provide your email!" );
            $('#email').focus() ;
            return false;
         }
         if( document.myForm.password.value == "" ) {
            alert( "Please provide your password!" );
            document.myForm.password.focus() ;
            return false;
         }
         var pwd1 = document.myForm.password.value;
         if(document.myForm.password2.value != pwd1){
            alert( "yourpassword does not match" );
            document.myForm.password2.focus() ;
            return false;
         }
         if( $('#firstname').val() == "" ) {
            alert( "Please provide your First name!" );
            $('#firstname').focus() ;
            return false;
         }

         if( $('#lastname').val() == "" ) {
            alert( "Please provide your Last Name!" );
            $('#lastname').focus() ;
            return false;
         }
         if( $('#DOB').val() == "" ) {
            alert( "Please provide your birthday!" );
            $('#DOB').focus() ;
            return false;
         }
         if( $('#address').val() == "" ) {
            alert( "Please provide your Address!" );
            $('#address').focus() ;
            return false;
         }else{
          alert("you succesfuly Validated")
         }

        var email = $('#email').val();
        var password = document.myForm.password.value;
        var lastname = $('#lastname').val();
        var firstname = $('#firstname').val();
        var bday = $('#DOB').val();
        var age = calculateAge(bday)
        var address = $('#address').val();
 //       document.forms[0].reset();
        submitted(email,lastname,firstname,bday,address);
        store(email,password,lastname,firstname,age,address);
      
          });

      });
         
//display the selected index value of array

       $(document).ready(function(){
          $("#btnS").click(function(){
            var ind1 = $('#loc1').val();
            var ind2 = $('#loc2').val();
            for(var i = 0; i < registerPerson.length; i++) {
              for (var j = 0;j < registerPerson[i].length; j++){
                var x = registerPerson[i][j];
                if(ind1 == i && ind2 == j){
                  alert("The value is: " + x);
                  break;
                }
              }
            }

          });
      });

    var registerPerson = [];
    function store(email,password,lastname,firstname,age,address){

        var ems = email;
        var pass=password;
        var last = lastname;
        var first = firstname;
        var ag = age;
        var add = address;

        registerPerson.push([ems,pass,last,first,ag,add]);
        localStorage.setItem("my_person", JSON.stringify(registerPerson));
        alert("added to localStorage");
 //       var storedFile = JSON.parse(localStorage.getItem("my_person"));
    }
      //calculate Age
      function calculateAge(date){
        var dob = new Date(date);
            if(date==null || date=='') {
               alert( "Please provide your email!" );  
               return false; 
             } else {
  
               //calculate month difference from current date in time
               var month_diff = Date.now() - dob.getTime();
               
               //convert the calculated difference in date format
               var age_dt = new Date(month_diff); 
               
               //extract year from date    
               var year = age_dt.getUTCFullYear();
               
               //now calculate the age of the user
               var age = Math.abs(year - 1970);
            }

         var age = document.getElementById("display_age").innerHTML =  
                  " " + age + " years old";
          return age;
      }

    //submitted input
    function submitted(a,b,c,d,e){
       var email = a;
         display_email.innerHTML= email;
       var firstname = b;
         display_firstname.innerHTML= firstname;

       var lastname = c;
         display_lastname.innerHTML= lastname;

       var age = d;
         display_age.innerHTML= age;

       var address = e;
         display_address.innerHTML=address;

       return email,lastname,firstname,age,address;
     }
    </script>
        <br>
        <br>
        <br>
 </body>
</html>


   