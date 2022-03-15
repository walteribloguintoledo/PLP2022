//SignUp Page

        let previousList = JSON.parse(localStorage.getItem("my_person")) || [];

        if (localStorage.getItem("currentLogin") != null) {
          window.location.replace("./index.html");
        }
      //Create a container DIV that will show input values on form submit
      $(document).ready(function(){
        $("#btnShow").click(function (e) {
          e.preventDefault();
          if (isEmpty($("#email").val())) {
              alert("Email is required");
              $('#email').focus() ;
              return;
          }
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($("#email").val())){
              alert("You have entered an invalid email address!");
              return;
          }
          if (isEmpty($("#password").val())) {
              alert("Password is required");
              return;
          } else if (!isNumeric($("#password").val()) || !isAlpha($("#password").val())) {
              alert("Password must be alphanumeric");
              return;
          }else if( $("#password2").val()!= $("#password").val()){
              alert("password does not match!");
              return;
          }
          if (isEmpty($('#firstname').val())) {
              alert("Firstname is required");
              return;
          }
          if (isEmpty($("#lastname").val())) {
              alert("Lastname is required");
              return;
          }
      
          if (isEmpty($("#DOB").val())) {
              alert("Birthdate is required");
              return;
          }
          if (isEmpty($("#address").val())) {
              alert("address is required");
              return;
          }


        var email = $('#email').val();
        var password = document.myForm.password.value;
        var lastname = $('#lastname').val();
        var firstname = $('#firstname').val();
        var bday = $('#DOB').val();
        var age = calculateAge(bday)
        var address = $('#address').val();
        document.forms[0].reset();
        storage(email,password,lastname,firstname,age,address);
          });
      });

      function calculateAge(date){
        var dob = new Date(date);
            if(date==null || date=='') {
               alert( "Please provide your email!" ); 
               return false; 
             } else {
  
               //calculate month difference from current date in time
               var month_diff = Date.now() - dob.getTime();
               
               //convert the calculated difference in date format
               var age_dt = new Date(month_diff); 
               
               //extract year from date    
               var year = age_dt.getUTCFullYear();
               
               //now calculate the age of the user
               var age = Math.abs(year - 1970);
            }

         var age = document.getElementById("display_age").innerHTML =  
                  " " + age + " years old";
          return age;
      }
      function storage(email,password,lastname,firstname,age,address){
        var user = {
           Email: email,
           Password: password,
           Lastname: lastname,
           Firstname: firstname,
           Age: age,
           Address: address
          }
          var email = $("#email").val();
          var passwords = $("#password");
          var person= localStorage.getItem("my_person");
          var data = JSON.parse(person);
     if (data != null){
          for(var i = 0; i < data.length; i++) {
            var emails = data[i].Email;
            console.log(emails)   
           if (email != emails ){
            console.table(previousList);
            previousList.push(user);
            localStorage.setItem("my_person", JSON.stringify(previousList)); 
            alert("added to localStorage");   
            var currentUser =[];
              var users = {
                Email:email,
                Password: password
              }
              currentUser.push(users);
              localStorage.setItem("currentLogin", JSON.stringify(currentUser));
              window.location.replace("index.html");
              alert("congratualation you have an account!");
              exit();
           }else{
            alert("Email is already registered");
            return;
           }
          }
      }else{
            previousList.push(user);
            localStorage.setItem("my_person", JSON.stringify(previousList));
            alert("added to localStorage else");   
            var currentUser =[];
              var users = {
                Email:email,
                Password: passwords
              }
              currentUser.push(users);
              localStorage.setItem("currentLogin", JSON.stringify(currentUser));
              alert("congratualation you have an account!");
              window.location.replace("./index.html");
      }
  
    }

      function display(){        
        var ind1 = document.getElementById("loc1").value;
  //      var ind2 = document.getElementById("loc2").value;
        for(var i = 0; i < registerPerson.length; i++) {
          for (var j = 0;j < registerPerson[i].length; j++){
            var x = registerPerson[i][0];
            if(ind1 == x){
              alert("Your Email is " + x);
              var email = registerPerson[i][0];
              display_email.innerHTML= email;
              var lastname = registerPerson[i][1];
              display_lastname.innerHTML= lastname;
              var firstname = registerPerson[i][2];
              display_firstname.innerHTML= firstname;
              var age = registerPerson[i][3];
              display_age.innerHTML= age;  
              var address = registerPerson[i][4];
              display_address.innerHTML= address;
              return;              
            }
          }
        }   
        if(ind1 !=x){
          alert("not yer registered");
        }               
      }

      function isNumeric(text) {
        var hasNumber = /[0-9]/g;
  
        if(hasNumber.test(text)) {
            return true;
        } else {
            return false;
        }
      }
  
      function isAlpha(text) {
        var hasChar = /[a-z]|[A-Z]/g;
  
        if(hasChar.test(text)) {
            return true;
        } else {
            return false;
        }
      }
  
      function isEmpty(text) {
        if (text === "") {
            return true;
        } else {
            return false;
        }
      }
    