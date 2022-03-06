function emptyfield()
{
  if(document.getElementById('uname').value == "")
  {
    alert('Empty Username');
    return false;
  }
  else if (document.getElementById('pass').value == "")
  {
    alert('Empty Password');
    return false;
  }
  else
  {
      alert('Welcome');
      return true;
  }
}
