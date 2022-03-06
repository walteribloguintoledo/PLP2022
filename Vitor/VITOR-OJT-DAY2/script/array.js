let userinputs = [];
function emptyfield()
{

function  tryys()
      {
        let userinput = {
          id: Date.now(),
          FirstName: document.getElementById('fname').value,
          LastName: document.getElementById('lname').value,
          Email: document.getElementById('Email').value,
          Username: document.getElementById('username').value,
          Password: document.getElementById('password').value
        }
        userinputs.push(userinput);
        document.forms[0].reset();

        console.warn('added' , {userinputs});
        let pre = document.querySelector('#msg pre');
        pre.textContent = '\n' + JSON.stringify(userinputs, '\t' , 2);
        }
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
  else
  {
    tryys();
  }

}