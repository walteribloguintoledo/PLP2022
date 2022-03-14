<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/style.css">

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
</head>
<body class="bods">
	<section>
		<div class="container-md">
			<div class="col-md-4">
				<span>
				<h2>Good Day Every One</h2>
				<p>I am Rico Jay. Today we are creating first task in our On-the-Job Traning in the Avasia Information System Inc.</p>
			    </span>
			</div>
			<div class="col-md-4">
				<img src="../pictures/random.jpg">				
			</div>

		</div>

	</section>
	<script type="text/javascript">

		function clearPanel(){
		    // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
		}

		Path.map("#index.php").to(function(){
		    alert("Users!");
		});

		Path.map("#login.php").to(function(){
		    alert("Comments!");
		}).enter(clearPanel);

		Path.map("#signup.php").to(function(){
		    alert("Posts!");
		}).enter(clearPanel);

		Path.root("#/index.php");

		Path.listen();
	</script>
</body>
</html>