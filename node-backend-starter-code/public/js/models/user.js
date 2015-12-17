var users = {
  userInfo: {},

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
    users.userInfo = user;
    console.log(user);
    var url = "http://localhost:3000/signup";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(user);
    xmlhttp.send(JSON.stringify(user));
    users.hideSignUp();
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
    users.userInfo = user;
    console.log(user);
    var url = "http://localhost:3000/login";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(user);
    xmlhttp.send(JSON.stringify(user));
    users.hideSignUp();
  },
  button: document.getElementById("signupsubmit"),
  buttonClick: function(){
    var self = this;
    self.button.addEventListener("click", self.login);
  },
  hideSignUp: function(){
    var div = document.getElementsByClassName("signup")[0];
    var form = document.getElementsByTagName("form")[0];
    var search = document.getElementsByClassName("searchallmovies")[0];
    var h2 = document.getElementsByTagName("h2")[0]
    var p = document.getElementById("placeholder");
    form.style.display = "none";
    h2.innerHTML = "Welcome! Please Enter A Movie Title";
    p.style.display = "none";
    search.style.display = "inline";
  }
};
