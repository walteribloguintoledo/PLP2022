$(document).ready(function () {
  $.Mustache.options.warnOnMissingTemplates = true;
  $.Mustache.load("template.html").done(function () {
    var loginUser = localStorage.getItem("currentLogin");
    var currentUser = localStorage.getItem("currentUser");
    var currentLoginUser = JSON.parse(currentUser);
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
        url: "signup.php",
        dataType: "json",
        data: user,
      }).then(
        function (response) {
          if (response.emailIsExist) {
            alert(`${data.Email} is already registered!`);
            return;
          }
          // if (response.userIsExist) {
          //   alert(`${data.Username} is already taken!`);
          //   $("#username").focus();
          //   return;
          // }
          // user is logged in successfully in the back-end
          if (response.success == "1") {
            // previousList.push(user);
            alert("congratualation you have an account!");
            location.reload();
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
      var email = email;
      Ajax(user);
    }
    function clearPanel() {
      // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    $("#navigation").html("").append($.Mustache.render("navigation"));
    Path.map("#/signup").to(function () {
      $("#target").html("").append($.Mustache.render("signup"));
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
        //        document.forms[0].reset();
        storage(email, password, lastname, firstname, age, address);
      });
    });
    var items = [];
    Path.map("#/login").to(function () {
      $("#target").html("").append($.Mustache.render("login"));
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
          url: "login.php",
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
      $("#target").html("").append($.Mustache.render("homepage"));
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
      $("#target").html("").append($.Mustache.render("admin"));
      if( localStorage.getItem("currentAdmin") == null){
        window.location.replace("#/login");
      }
      if( localStorage.getItem("currentLogin") != null){
        window.location.replace("#/homepage");
      }
      insert_record();
      function insert_record(){
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
      }


        $.ajax({
          type: "POST",
          url: "view.php",
        }).then(
          function (response) {
            response = $.parseJSON(response);
            if(response.status=='success'){
              $('#table').html(response.html);
            }
          },
          function () {
            alert("There was some error!");
          }
        );
      
        $(document).on('click','#btnDelete',function(){
          var DeleteID = $(this).attr('data-id2');
          $(document).on("click",'#modalDelete',function(){
            $.ajax({
              type: "POST",
              url: "delete.php",
              data:{del_Id:DeleteID},
            }).then(
              function (response) {
                alert(response);
                location.reload();
              },
              function () {
                alert("There was some error!");
              }
            );
            })
          })



        $(document).on('click','#modalEdit',function(){
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
            url: "update.php",
            data:{U_Id:updateId,U_Email:updateEmail,U_Password:updatePassword,U_Lastname:updateLastname,U_Firstname:updateFirstname,U_Age:updateAge,U_Address:updateAddress},
          }).then(
            function (response) {
              alert(response);
              location.reload();
            },
            function () {
              alert("There was some error!");
            }
          );

        }) 
        

        $(document).on('click','#btnEdit',function(){
          var ID = $(this).attr('data-id');
          $.ajax({
            url: "getData.php",
            type: "POST",
            data: {userID:ID},
            dataType: "JSON",
          }).then(
            function (response) {
              console.log(response[4]);
              $('#edit_ID').val(response[0]);
              $('#edit_email').val(response[1]);
              $('#edit_password').val(response[2]);
              $('#edit_lastname').val(response[3]);
              $('#edit_firstname').val(response[4]);
              $('#edit_DOB').val(response[5]);
              $('#edit_address').val(response[6]);

            },
            function () {
              alert("There was some error!");
            }
          )
          })



      if (localStorage.getItem("currentAdmin") != null) {
        $(".currentlogin").removeAttr("hidden");
        $(".notLogin").attr("hidden", true);
      }
      // sign out the user
      $("#btnLogout").click(function () {
        localStorage.removeItem("currentAdmin");
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
