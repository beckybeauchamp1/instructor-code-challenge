var users = {
  // my json response to signup or login
  userInfo: {},
  // this is an object for my ajax response request message. I plan to display messages to users.
  requestMessage: {},
  // Changing the login displays for signup versus login for current users
  changeLogins: function(){
    var button = document.getElementById("placeholder");
    var click = 0;
    var submit = document.getElementById("signupsubmit");
    button.addEventListener("click", function(){
      if(!click) {
        var signup = document.getElementsByClassName("signup")[0].children[0];
        signup.innerHTML = "Sign Up";
        button.innerHTML = "Log In To See Your Favorites";
        submit.setAttribute("class", "signup");
        submit.classList.remove("login")
        click++;
      }
      else {
        var signup = document.getElementsByClassName("signup")[0].children[0];
        signup.innerHTML = "Log In";
        button.innerHTML = "Signup to Search for Movies";
        submit.setAttribute("class", "login");
        submit.classList.remove("signup")
        click = 0;
      }
    });
  },
  // Need to push this signup and login code into one function and call it depending on signup versus logging in
  signup: function(evt){
    evt.preventDefault();
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email =  document.getElementById("email").value;
    this.userEmail = email;
    var password = document.getElementById("password").value;
    var user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    if(email === "" || firstname === "" || lastname === "" || password === ""){
      alert("You are missing all required fields!");
    }
    else{
      var url = heroku + "/login";
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', url, true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var message = JSON.parse(xmlhttp.responseText);
          users.userInfo = message.user;
          users.requestMessage = message.message;
          users.hideSignUp();
        }
        else if(xmlhttp.status == 401){
          var message = JSON.parse(xmlhttp.responseText);
          users.requestMessage = message.message;
        }
      };
      xmlhttp.send(JSON.stringify(user));
    }
  },
  login: function(evt){
    evt.preventDefault();
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email =  document.getElementById("email").value;
    this.userEmail = email;
    var password = document.getElementById("password").value;
    var user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    if(email === "" || firstname === "" || lastname === "" || password === ""){
      alert("You are missing all required fields!");
    }
    else{
      var url = heroku + "/login";
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', url, true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var message = JSON.parse(xmlhttp.responseText);
          users.userInfo = message.user;
          users.requestMessage = message.message;
          console.log(message.user);
          users.hideSignUp();
        }
        else if(xmlhttp.status == 401){
          var message = JSON.parse(xmlhttp.responseText);
          users.requestMessage = message.message;
        }
      };
      xmlhttp.send(JSON.stringify(user));
    }

  },
  button: document.getElementById("signupsubmit"),
  buttonClick: function(){
    var self = this;
    var submit = document.getElementById("signupsubmit");
    var type = document.getElementsByClassName("signup")[0].children[0];
    submit.classList.contains("login")? self.button.addEventListener("click", self.login) : self.button.addEventListener("click", self.signup);
  },
  hideSignUp: function(){
    // want to take these into a separate object since I use these DOM elements frequently throughout my code
    var div = document.getElementsByClassName("signup")[0];
    var form = document.getElementsByTagName("form")[0];
    var search = document.getElementsByClassName("searchallmovies")[0];
    var h2 = document.getElementsByTagName("h2")[0];
    var p = document.getElementById("placeholder");
    form.style.display = "none";
    h2.innerHTML = "Welcome! Please Enter A Movie Title";
    p.style.display = "none";
    search.style.display = "inline";
  },
};
