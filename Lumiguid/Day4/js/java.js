//SignUp Page

      //Create a container DIV that will show input values on form submit
      $(document).ready(function(){
          $("#btnShow").click(function(){
            if( $('#email').val() == "" ) {
            alert( "Please provide your email!" );
            $('#email').focus() ;
            return false;
         }
         if( document.myForm.password.value == "" ) {
            alert( "Please provide your password!" );
            document.myForm.password.focus() ;
            return false;
         }
         var pwd1 = document.myForm.password.value;
         if(document.myForm.password2.value != pwd1){
            alert( "yourpassword does not match" );
            document.myForm.password2.focus() ;
            return false;
         }
         if( $('#firstname').val() == "" ) {
            alert( "Please provide your First name!" );
            $('#firstname').focus() ;
            return false;
         }

         if( $('#lastname').val() == "" ) {
            alert( "Please provide your Last Name!" );
            $('#lastname').focus() ;
            return false;
         }
         if( $('#DOB').val() == "" ) {
            alert( "Please provide your birthday!" );
            $('#DOB').focus() ;
            return false;
         }
         if( $('#address').val() == "" ) {
            alert( "Please provide your Address!" );
            $('#address').focus() ;
            return false;
         }else{
          alert("you succesfuly Validated")
         }

        var email = $('#email').val();
        var password = document.myForm.password.value;
        var lastname = $('#lastname').val();
        var firstname = $('#firstname').val();
        var bday = $('#DOB').val();
        var age = calculateAge(bday)
        var address = $('#address').val();
 //       document.forms[0].reset();
        submitted(email,lastname,firstname,bday,address);
        store(email,password,lastname,firstname,age,address);
      
          });
          // Get value on button click and show alert
      });


 //     function showDiv(){
         
//display the selected index value of array
      $(document).ready(function(){
          var user= localStorage.getItem("my_person");
          var data = JSON.parse(user);     
          $("#btnS").click(function(){
            var ind1 = $('#loc1').val();
            var ind2 = $('#loc2').val();
            for(var i = 0; i < data.length; i++) {
              for (var j in data[i]){
                var x = data[i][j];
                if(ind1 == i && ind2 == j){
                  alert("The value is: " + x);
                  break;
                }else{
                  alert("not in the array");
                  exit();
                }
              }
            }

          });
          // Get value on button click and show alert
      });

    var registerPerson = [];
    function store(email,password,lastname,firstname,age,address){
      var ems = email;
      var pas =password;
      var last = lastname;
      var first =firstname;
      var ag = age;
      var add = address;
      var user = {
         Email: ems,
         Password: pas,
         Lastname: last,
         Firstname: first,
         Age: ag,
         Address: add
        }
        registerPerson.push(user);
        localStorage.setItem("my_person", JSON.stringify(registerPerson));
        alert("added to localStorage");
 //       var storedFile = JSON.parse(localStorage.getItem("my_person"));
        console.table(registerPerson);

    //mustache template
    $.each(registerPerson,function(index,item){
    var template = ''
              +'<div class="dataItem"'
                + '<span>{{Email}}<br>{{Password}}<br>{{Lastname}}<br>{{Firstname}}<br>{{Age}}<br>{{Address}}</span>'
              +'</div>';
    $('.dataItem').append(Mustache.render(template,item));
    });
    }

      //calculate Age
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

    //submitted input
    function submitted(a,b,c,d,e){
       var email = a;
         display_email.innerHTML= email;
       var firstname = b;
         display_firstname.innerHTML= firstname;

       var lastname = c;
         display_lastname.innerHTML= lastname;

       var age = d;
         display_age.innerHTML= age;

       var address = e;
         display_address.innerHTML=address;

       return email,lastname,firstname,age,address;
     }

//LogIn Page

  function loginFunc(){

    var email = $("#uname").val();
    var password = $("#psw").val();

    var user= localStorage.getItem("my_person");
    var data = JSON.parse(user);
   /*
    if(user == null){
     result = result.innerHTML = "wrong email";
     alert("wrong email");
    }else if(email == data[0][0] && password==data[0][1]){
      result = result.innerHTML = 'Logged In';
      alert("logged In");
    }else{
      result = result.innerHTML = "wrongpassword";
      alert("wrongpassword");
    }
  */      
     for(var i = 0; i < data.length; i++) {
         var em = data[i].Email;
         var pas = data[i].Password; 
         console.log(em)   
        if (email != em ){
          alert("not registered email");
          exit();
        }else if(password!=pas){
          alert("wrongpassword"); 
          exit();
        }else if(email == em && password == pas){
            alert("Logged In");
            window.location.replace("userProfile.html");
            break;
            exit();

        }
      }
  }
  