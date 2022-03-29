$(document).ready(function () {
  var App = {
    target: $("#target"),
    api:"../api/"
  }
  function isNumeric(text) {
    var hasNumber = /[0-9]/g;
    if (hasNumber.test(text)) {
      return true;
    } else {
      return false;
    }
  }
  function isAlpha(text) {
    var hasChar = /[a-z]|[A-Z]/g;
    if (hasChar.test(text)) {
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
  function calculateAge(date) {
    var dob = new Date(date);
    if (date == null || date == "") {
      alert("Please provide your email!");
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
    return age;
  }
  function Ajax(data) {
    var user = data;
    $.ajax({
      type: "POST",
      url: App.api + "signup",
      dataType: "json",
      data: user,
    }).then(
      function (response) {
        if (response.emailIsExist) {
          alert(`${data.Email} is already registered!`);
          location.reload();
          return;
        }
        if (response.success == "1") {
          // previousList.push(user);
          alert("congratualation you have an account!");
          $.ajax({
            type: "GET",
            url: App.api + "view",
            dataType: "json",
            success: function(response){
              if(response.status=='success'){
               localStorage.setItem("allUser", JSON.stringify(response.html));
               window.location.reload();
              }
            }
          });
        } else {
          alert("Invalid Credentials!");
        }
      },
      // reject/failure callback
      function () {
        alert("There was some error!");
      }
    );
  }
  function storage(email, password, lastname, firstname, age, address) {
    var user = {
      Email: email,
      Password: password,
      Lastname: lastname,
      Firstname: firstname,
      Age: age,
      Address: address,
    };
    //var email = email;
    Ajax(user);
  }
  $.Mustache.options.warnOnMissingTemplates = true;
  $.Mustache.load("templates/auth.html").done(function () {
    function clearPanel() {
      // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }
    $("#navigation").html("").append($.Mustache.render("navigation"));
    Path.map("#/signup").to(function () {
      App.target.html("").append($.Mustache.render("signup"));
        //SignUp Page
        if( localStorage.getItem("currentLogin") != null){
          window.location.replace("#/homepage");
        }
        if( localStorage.getItem("currentAdmin") != null){
          window.location.replace("#/admin");
        }
        // let previousList = JSON.parse(localStorage.getItem("my_person")) || [];
        $("#myForm").on("submit", function (e) {
          e.preventDefault();
          if (isEmpty($("#email").val())) {
            alert("Email is required");
            $("#email").focus();
            return;
          }
          if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              $("#email").val()
            )
          ) {
            alert("You have entered an invalid email address!");
            return;
          }
          if (isEmpty($("#password").val())) {
            alert("Password is required");
            return;
          } else if (
            !isNumeric($("#password").val()) ||
            !isAlpha($("#password").val())
          ) {
            alert("Password must be alphanumeric");
            return;
          } else if ($("#password2").val() != $("#password").val()) {
            alert("password does not match!");
            return;
          }
          if (isEmpty($("#firstname").val())) {
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
          var email = $("#email").val();
          var password = document.myForm.password.value;
          var lastname = $("#lastname").val();
          var firstname = $("#firstname").val();
          var bday = $("#DOB").val();
          var age = calculateAge(bday);
          var address = $("#address").val();
          storage(email, password, lastname, firstname, age, address);
        });
    });
    var items = [];
    Path.map("#/login").to(function () {
      App.target.html("").append($.Mustache.render("login"));
      if( localStorage.getItem("currentLogin") != null){
        window.location.replace("#/homepage");
      }
      if( localStorage.getItem("currentAdmin") != null){
        window.location.replace("#/admin");
      }

      $("#btnLogin").click(function (e) {
        e.preventDefault();
        if (isEmpty($("#uname").val())) {
          alert("Email is required");
          $("#email").focus();
          return;
        }
        if (isEmpty($("#psw").val())) {
          alert("Password is required");
          return;
        }
        var currentUser = [];
        var email = $("#email").val();
        var password = $("#password").val();
        var user = {
          Email: email,
          Password: password,
        };
        currentUser.push(user);
        $.ajax({
          type: "POST",
          url: App.api + "login",
          data: user,
          dataType: "json",
        }).then(
          function (response) {
            if (response.isValid) {
              if (response.Users["userType"] == "admin") {
                alert("You are logged in Admin " + response.Users["firstname"] + " " +response.Users["lastname"]);
                items.push(response.Users);
                window.location.replace("#/admin");
                localStorage.setItem("currentUser", JSON.stringify(items));
                localStorage.setItem("currentAdmin",JSON.stringify(currentUser) );
                return;
              }
              console.log(items);
              alert("You are logged in " + response.Users["firstname"] +" "+ response.Users["lastname"]);
              items.push(response.Users);
              window.location.replace("#/homepage");
              localStorage.setItem("currentUser", JSON.stringify(items));
              localStorage.setItem("currentLogin", JSON.stringify(currentUser));
            } else {
              alert("Credentials is incorrect");
            }
          },
          function () {
            alert("There was some error!");
          }
        );
      });
    });

    // var user = localStorage.getItem("my_person");
    Path.map("#/homepage").to(function () {
      // var person = localStorage.getItem("currentUser");
      // var data = JSON.parse(person); 
      // var resultList = [];
      // $.each(data, function (index, item) {
      //   var result = {
      //     firstname: item.firstname,
      //     lastname: item.lastname,
      //     email: item.email,
      //     age: item.age,
      //     address: item.address
      //   }
      //   resultList.push(result);
      // });

      // var templateData = {
      //   currentUser: resultList
      // }
      // console.log(resultList);
      App.target.html("").append($.Mustache.render("homepage"));
      if( localStorage.getItem("currentLogin") == null){
        window.location.replace("#/login");
      }
      if( localStorage.getItem("currentAdmin") != null){
        window.location.replace("#/admin");
      }
      var person = localStorage.getItem("currentUser");
      var data = JSON.parse(person);
      $.each(data, function (index, item) {
        var html = "" + "{{firstname}}" + " " + "{{lastname}}";
        $("#userName").append(Mustache.render(html, item));
      });

      $.each(data, function (index, item) {
        var html =
          "" +
          "Email:" +
          " " +
          "{{email}}<br>Full Name:" +
          " " +
          "{{firstname}}" +
          " " +
          "{{lastname}}<br>Age:" +
          " " +
          "{{age}}<br>Address:" +
          " " +
          "{{address}}<br>";
        $("#userInfo").append(Mustache.render(html, item));
      });

      $(document).ready(function () {
        //hide the signup ang login navigation
        if (localStorage.getItem("currentLogin") != null) {
          $(".currentlogin").removeAttr("hidden");
          $(".notLogin").attr("hidden", true);
        }
        // sign out the user
        $("#btnLogout").click(function () {
          localStorage.removeItem("currentLogin");
          window.location.reload();
        });
      });
    });
    Path.map("#/admin").to(function () {
      var allUser = localStorage.getItem("allUser")
      var allUsers = JSON.parse(allUser);
      var resultList =[];
      $.each(allUsers, function (index, item) {
        console.log(item);
        var html ={
          id: item.id,
          email: item.email,
          lastname: item.lastname,
          firstname:item.firstname,
          age: item.age,
          address: item.address
        }
        resultList.push(html)
      });
      
      var templateData = {
        users: resultList
      }
      App.target.html("").append($.Mustache.render('admin',templateData));
      if( localStorage.getItem("currentAdmin") == null){
        window.location.replace("#/login");
      }
      if( localStorage.getItem("currentLogin") != null){
        window.location.replace("#/homepage");
      }
      //addnewuser
        $("#modalInsert").on("click", function (e) {
          e.preventDefault();
          if (isEmpty($("#email").val())) {
            alert("Email is required");
            $("#email").focus();
            return;
          }
          if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              $("#email").val()
            )
          ) {
            alert("You have entered an invalid email address!");
            return;
          }
          if (isEmpty($("#password").val())) {
            alert("Password is required");
            return;
          } else if (
            !isNumeric($("#password").val()) ||
            !isAlpha($("#password").val())
          ) {
            alert("Password must be alphanumeric");
            return;
          } else if ($("#password2").val() != $("#password").val()) {
            alert("password does not match!");
            return;
          }
          if (isEmpty($("#firstname").val())) {
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
          var email = $("#email").val();
          var password = $("#password").val();
          var lastname = $("#lastname").val();
          var firstname = $("#firstname").val();
          var bday = $("#DOB").val();
          var age = calculateAge(bday);
          var address = $("#address").val();
          storage(email, password, lastname, firstname, age, address);
        });
      //display all users

        $.ajax({
          type: "GET",
          url: App.api + "view",
          dataType: "json",
          success: function(response){
            if(response.status=='success'){
             localStorage.setItem("allUser", JSON.stringify(response.html));
             
            }
          }
        });

        $(document).on('click','#btnDelete',function(){
          var DeleteID = $(this).attr('data-id2');
          $(document).on("click",'#modalDelete',function(){
            $.ajax({
              type: "POST",
              url: App.api + "delete",
              data:{del_Id:DeleteID},
            }).then(
              function (response) {
                alert(response);
                $.ajax({
                  type: "GET",
                  url: App.api + "view",
                  dataType: "json",
                  success: function(response){
                    if(response.status=='success'){
                     localStorage.setItem("allUser", JSON.stringify(response.html));
                     window.location.reload();
                    }
                  }
                });
              },
              function () {
                alert("There was some error!");
              }
            );
            });
          });

          // $("#try").on("submit",function (e) {
          //   e.preventDefault();
          //   alert("Hello");
          // });
          $("#editForm").on("submit",function(e){
            e.preventDefault();
        //  $(document).on('click','#modalEdit',function(){
            var updateId = $('#edit_ID').val();
            var updateEmail = $('#edit_email').val();
            var updatePassword = $('#edit_password').val();
            var updatePassword2 = $('#edit_password2').val();
            var updateLastname = $('#edit_lastname').val();
            var updateFirstname = $('#edit_firstname').val();
            var updateAge = $('#edit_DOB').val();
            var updateAddress = $('#edit_address').val();
            if (isEmpty(updatePassword)) {
              alert("Password is required");
              return;
            } else if (
              !isNumeric(updatePassword) ||
              !isAlpha(updatePassword)
            ) {
              alert("Password must be alphanumeric");
              return;
            } else if (updatePassword2 != updatePassword) {
              alert("password does not match!");
              return;
            }
            if (isEmpty(updateFirstname)) {
              alert("Firstname is required");
              return;
            }
            if (isEmpty(updateLastname)) {
              alert("Lastname is required");
              return;
            }
    
            if (isEmpty(updateAge)) {
              alert("Birthdate is required");
              return;
            }
            if (isEmpty(updateAddress)) {
              alert("address is required");
              return;
            }

          $.ajax({
            type: "POST",
            url: App.api + "update",
            dataType: "json",
            data:{U_Id:updateId,U_Email:updateEmail,U_Password:updatePassword,U_Lastname:updateLastname,U_Firstname:updateFirstname,U_Age:updateAge,U_Address:updateAddress},
            success:function(data){
              if(parseInt(data.success)===1){
                alert("Successfully updated");
                window.location.reload();
                // $.ajax({
                //   type: "GET",
                //   url: App.api + "view",
                //   dataType: "json",
                //   success: function(response){
                //     if(response.status==='success'){
                //      localStorage.setItem("allUser", JSON.stringify(response.html));
                //      window.location.reload();
                //     }
                //   }
                // });
                
              }
              else{
                alert("failed to update");
              }
            }
          });
        }); 
        

        $(document).on('click','#btnEdit',function(){
          var ID = $(this).attr('data-id');
          $.ajax({
            url: App.api + "getData", //"api/getData",
            type: "POST",
            data: {userID:ID},
            dataType: "JSON",
            success:function(data){
              console.log(data);
              $("#edit_ID").val(data.id);
              $("#edit_email").val(data.email);
              $("#edit_password").val(data.password);
              $("#edit_password2").val(data.password);
              $("#edit_lastname").val(data.lastname);
              $("#edit_firstname").val(data.firstname);
              $("#edit_age").val(data.age);
              $("#edit_address").val(data.address);

            }
          });
        });


      if (localStorage.getItem("currentAdmin") != null) {
        $(".currentlogin").removeAttr("hidden");
        $(".notLogin").attr("hidden", true);
      }
      // sign out the user
      $("#btnLogout").click(function () {
        localStorage.removeItem("currentAdmin");
        localStorage.removeItem("allUser");
        window.location.reload();
      });
    });
    Path.root("#/login");

    // Path.rescue(function () {
    //   $("#target").html(`
    // 		<p>404: URL is invalid</p>
    // 		<a href=${routes.home}>Go back</a>
    // 	`);
    // });

    Path.listen();
  });
});
