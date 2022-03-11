<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <script src="js/java.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.0/mustache.min.js"></script>
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
      <h2>Mustache</h2>
    </div>
    <div class="dataItem" id="">

    </div>
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
             <select id="loc2" name="loc2">
              <option value="Email">Email</option>
              <option value="Password">Password</option>
              <option value="Lastname">Lastname</option>
              <option value="Firstname">Firstname</option>
              <option value="Age">Age</option>
              <option value="Address">Address</option>
            </select>
          </div>
          <input type="button" class="btnlogin" id="btnS" value="Search" />          
      </div>
  </div>
    <script type="text/JavaScript">
    </script>
        <br>
        <br>
        <br>
 </body>
</html>


   