if (localStorage.getItem("currentLogin") != null) {
  window.location.replace("./index.html");
}

$("#btnLogin").click(function (e) {
  e.preventDefault();
  var email = $("#uname").val();
  var password = $("#psw").val();
  var currentUser = [];
  var user= localStorage.getItem("my_person");
  var data = JSON.parse(user); 

  if (data != null){
   
   for(var i = 0; i < data.length; i++) {
       var emails = data[i].Email;
       var passwords = data[i].Password; 
       console.log(emails)   
       if(email == emails && password == passwords){
          alert("Logged In");
//            window.location.replace("userProfile.html");   
          var users = {
            Email:emails,
            Password: passwords
          }
          currentUser.push(users);
          localStorage.setItem("currentLogin", JSON.stringify(currentUser));
          window.location.replace("./index.html");            
          return;
      }
    }
    if (email != emails ){
      alert("not registered email");
      return;
    }else if(password!=passwords){
      alert("wrongpassword"); 
      return;
    }
  }else{
    alert("no registered email");
  }

});
