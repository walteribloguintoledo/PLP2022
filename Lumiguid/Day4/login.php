<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/javascript" href="js/java.js">
	<title>Login</title>
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
<body class="bods">
<form action="action_page.php" method="post" class="formlogin">
  <div class="imgcontainer">
    <img src="../pictures/signup.png" alt="Avatar" class="avatar">
  </div>

  <div class="container" id="login">
    <label><b>Username</b></label>
    <input type="text" placeholder="Enter Email" class="username" id="uname" required><br>
    <label><b>Password</b></label>
    <input type="password" placeholder="Enter Password" id="psw" required><br>

    <button type="button" onclick="loginFunc()" class="btnlogin">Login</button>
    <button type="button" class="btnlogin">Cancel</button>
    <p id="result"></p>
</form>
<script type="text/javascript">
//LogIn Page

  function loginFunc(){

    var email = $("#uname").val();
    var password = $("#psw").val();
    var result = $("#result").val();

    var user= localStorage.getItem("my_person");
    var data = JSON.parse(user);
   /*
    if(user == null){
     result = result.innerHTML = "wrong email";
     alert("wrong email");
    }else if(email == data[0][0] && password==data[0][1]){
      result = result.innerHTML = 'Logged In';
      alert("logged In");
    }else{
      result = result.innerHTML = "wrongpassword";
      alert("wrongpassword");
    }
   */
     for(var i = 0; i < data.length; i++) {
       for (var j = 0;j < 1; j++){
         var em = data[i][0];
         var pas = data[i][1];
         if(email == em && password == pas){
         		alert("Logged In");
         		window.location.replace("userProfile.html");
         		break;
         	}
  			}
			}
			if (email =! em ){
				alert("wrong email")
			}else if(password!=pas){
				alert("wrongpassword");
			}
	}
		
</script>
</body>
</html>