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

function ageCalculator() {
    var userinput = document.getElementById("DOB").value;
    var dob = new Date(userinput);
    if(userinput==null || userinput=='') {
      document.getElementById("message").innerHTML = "**Choose a date please!";
      return false;
    } else {
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    document.getElementById("result").innerHTML =
             "Age is: " + age + " years. ";
    }
}


  /*function showMessage()
      {
        var userfname = document.getElementById('fname').value;
        document.getElementById('display_fname').innerHTML = userfname;

        var userlname = document.getElementById('lname').value;
        document.getElementById('display_lname').innerHTML = userlname;



        var userage = document.getElementById('age').value;
        document.getElementById('display_age').innerHTML = userage;


        var useremail = document.getElementById('Email').value;
        document.getElementById('display_Email').innerHTML = useremail;
      }*/
