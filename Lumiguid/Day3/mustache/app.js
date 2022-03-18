$(document).ready(function () {
  $.Mustache.options.warnOnMissingTemplates = true;
  $.Mustache.load("template.html").done(function () {

    function clearPanel() {
      // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }
    $("#navigation").html("").append($.Mustache.render("navigation"));
    Path.map("#/signup").to(function () {
      $("#target").html("").append($.Mustache.render("signup", info));
      //SignUp Page
      let previousList = JSON.parse(localStorage.getItem("my_person")) || [];

      if (localStorage.getItem("currentLogin") != null) {
        window.location.replace("#/homepage");
      }
      //Create a container DIV that will show input values on form submit
      $("#myForm").on("submit", function (e) {
        //$("#btnShow").click(function (e) {
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
        document.forms[0].reset();
        storage(email, password, lastname, firstname, age, address);
      });

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

        var age = (document.getElementById("display_age").innerHTML =
          " " + age + " years old");
        return age;
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
        var person = localStorage.getItem("my_person");
        var data = JSON.parse(person);
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            var emails = data[i].Email;
            if (email != emails) {
              previousList.push(user);
              localStorage.setItem("my_person", JSON.stringify(previousList));
              alert("added to localStorage wewe");
              window.location.replace("#/login");
              alert("congratualation you have an account!wewew");
              return;
            } else {
              alert("Email is already registered");
              return;
            }
          }
        } else {
          previousList.push(user);
          localStorage.setItem("my_person", JSON.stringify(previousList));
          alert("added to localStorage else");
          alert("congratualation you have an account!");
          window.location.replace("#/login");

          var str = $("myForm").serialize();

          $.ajax({
            method: "POST",
            url: "some.php",
            dataType: "json",
            data: str,
          }).done(function (msg) {
            alert("Data Saved: " + msg);
          });
        }
      }

      function display() {
        var ind1 = document.getElementById("loc1").value;
        for (var i = 0; i < registerPerson.length; i++) {
          for (var j = 0; j < registerPerson[i].length; j++) {
            var x = registerPerson[i][0];
            if (ind1 == x) {
              alert("Your Email is " + x);
              var email = registerPerson[i][0];
              display_email.innerHTML = email;
              var lastname = registerPerson[i][1];
              display_lastname.innerHTML = lastname;
              var firstname = registerPerson[i][2];
              display_firstname.innerHTML = firstname;
              var age = registerPerson[i][3];
              display_age.innerHTML = age;
              var address = registerPerson[i][4];
              display_address.innerHTML = address;
              return;
            }
          }
        }
        if (ind1 != x) {
          alert("not yet registered");
        }
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
    });

    Path.map("#/login").to(function () {
      $("#target").html("").append($.Mustache.render("login", info));
      if (localStorage.getItem("currentLogin") != null) {
        window.location.replace("#/homepage");
      }

      $("#btnLogin").click(function (e) {
        e.preventDefault();
        var email = $("#uname").val();
        var password = $("#psw").val();
        var currentUser = [];
        var user = localStorage.getItem("my_person");
        var data = JSON.parse(user);

        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            var emails = data[i].Email;
            var passwords = data[i].Password;
            console.log(emails);
            if (email == emails && password == passwords) {
              alert("Logged In");
              //            window.location.replace("userProfile.html");
              var users = {
                Email: emails,
                Password: passwords,
              };
              currentUser.push(users);
              localStorage.setItem("currentLogin", JSON.stringify(currentUser));
              window.location.replace("#/homepage");
              return;
            }
          }
          if (email != emails) {
            alert("not registered email");
            return;
          } else if (password != passwords) {
            alert("wrongpassword");
            return;
          }
        } else {
          alert("no registered email");
        }
      });
    });

    Path.map("#/homepage").to(function () {
      $("#target").html("").append($.Mustache.render("homepage", name));
      if (localStorage.getItem("currentLogin") == null) {
        window.location.replace("#/login");
      }
      $(document).ready(function () {
        if (localStorage.getItem("currentLogin") != null) {
          $(".currentlogin").removeAttr("hidden");
          $(".notLogin").attr("hidden", true);
        }

        // sign out the user
        $("#btnLogout").click(function () {
          localStorage.removeItem("currentLogin");
          window.location.replace("#/login");
        });
      });
    });
    Path.root("#/login");
    Path.listen();
  });
});
