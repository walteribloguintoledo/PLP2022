


function emptyfield()
{

  if(document.getElementById('fname').value == "")
  {
    alert('Empty First Name');
    return false;

  }
  else if (document.getElementById('lname').value == "")
  {
    alert('Empty Last Name');
    return false;
  }
  else if (document.getElementById('Email').value == "")
  {
    alert('Empty Email');
    return false;
  }
  else if (document.getElementById('username').value == "")
  {
    alert('Empty Username');
    return false;
  }
  else if (document.getElementById('password').value == "")
  {
    alert('Empty Password');
    return false;
  }

}

  function showMessage()
      {
        var name = document.getElementById('fname').value + " " + document.getElementById('lname').value;
        document.getElementById('display_name').innerHTML = name;

        var useremail = document.getElementById('Email').value;
        document.getElementById('display_Email').innerHTML = useremail;

        var username= document.getElementById('username').value;
        document.getElementById('display_username').innerHTML = username;

        var userpass = document.getElementById('password').value;
        document.getElementById('display_password').innerHTML = userpass;


      }

      function callboth()
      {
        emptyfield()
        showMessage()
      }
