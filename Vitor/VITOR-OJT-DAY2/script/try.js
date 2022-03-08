const userinputs = [];
function tryys()
{
  var userinput = {
          FirstName: document.getElementById('fname').value,
          LastName: document.getElementById('lname').value,
          Email: document.getElementById('Email').value,
          Username: document.getElementById('username').value,
          Password: document.getElementById('password').value
        }
        userinputs.push(userinput);//display
        //document.forms[0].reset();
        //alert(userinput.FirstName)
        console.warn('added' , {userinputs});
        let pre = document.querySelector('#msg pre');//display
        pre.textContent = '\n' + JSON.stringify(userinputs, '\t' , 2);//display
        return userinput;

}

function access()
  {
     var userinput = {
          FirstName: document.getElementById('fname').value,
          LastName: document.getElementById('lname').value,
          Email: document.getElementById('Email').value,
          Username: document.getElementById('username').value,
          Password: document.getElementById('password').value
     
     
   }
    alert (userinput.FirstName)
    alert (userinput.LastName)
    alert (userinput.Email)
    alert (userinput.Username)
    alert (userinput.Password)

}