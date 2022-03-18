<?php 
 session_start();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="includes/signup.inc.php" method="post">
      <input type="text" name="uid" placeholder="Username" />
      <input type="text" name="pwd" placeholder="Password" />
      <input type="text" name="pwdrepeat" placeholder="Repeat Password" />
      <input type="text" name="email" placeholder="Email" />
      <br />
      <button type="submit" name="submit">SignUp</button>
    </form>

    <form action="includes/login.inc.php" method="post">
      <input type="text" name="uid" placeholder="Username" />
      <input type="text" name="pwd" placeholder="Password" />
      <br />
      <button type="submit" name="submit">login</button>
    </form>
  </body>
</html>
