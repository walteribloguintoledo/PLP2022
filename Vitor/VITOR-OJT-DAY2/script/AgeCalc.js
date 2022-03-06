


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

  else if (document.getElementById('DOB').value == "")
  {
    alert('Empty Date');
    return false;
  }

  else
  {
    var name = document.getElementById('fname').value + " " + document.getElementById('lname').value;
        document.getElementById('display_name').innerHTML = name;

        var useremail = document.getElementById('Email').value;
        document.getElementById('display_Email').innerHTML = useremail;

        /*Age Calculation*/
        var userinput = document.getElementById("DOB").value;
        var dob = new Date(userinput);
        var month_diff = Date.now() - dob.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        var age = Math.abs(year - 1970);
        document.getElementById("result").innerHTML = age;
      
  }
}
