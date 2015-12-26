var users = {
  // my json response to signup or login
  userInfo: {},
  // this is an object for my ajax response request message. I plan to display messages to users.
  requestMessage: undefined,
  // Changing the login displays for signup versus login for current users

  buttonEventListener: function(){
    var self = this;
    var submitButton = document.getElementsByClassName("signupsubmit")[0];
    submitButton.addEventListener("click", self.identifyUser);
  },
  identifyUser: function(evt){
    evt.preventDefault();
    var submitButton = document.getElementsByClassName("signupsubmit")[0];
    var type = submitButton.id;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email =  document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if(type === "signup" && (email === "" || firstname === "" || lastname === "" || password === "")){
      alert("You are missing all required " + type + " fields!");
    }
    else if(type === "login" && (email === "" || password === "")){
      alert("You are missing all required " + type + " fields!");
    }
    else{
      // signup had bugs, so placing function hideSignUp HERE:
      var user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };
      users.userInfo = user;
      var url = "http://localhost:3000/" + type;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', url, true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var message = JSON.parse(xmlhttp.responseText);
          if(message.user !== undefined){
            users.userInfo = message.user;
          }
          else{
            users.fetchCurrentUser();
          }
          users.requestMessage = message.message;
          users.hideSignUp();
          usersView.displayMessages();
        }
        else if(xmlhttp.status == 401){
          var message = JSON.parse(xmlhttp.responseText);
          users.requestMessage = message.message;
          usersView.displayMessages();
        }
      };
    }
    xmlhttp.send(JSON.stringify(user));
  },
  hideSignUp: function(){
    // want to take these into a separate object since I use these DOM elements frequently throughout my code
    var div = document.getElementsByClassName("userlogin")[0];
    var form = document.getElementsByTagName("form")[0];
    var search = document.getElementsByClassName("searchallmovies")[0];
    var h2 = document.createElement("h2");
    var div2 = document.createElement("div");
    div2.setAttribute("class", "left-side-divs");
    div.appendChild(div2);
    div2.appendChild(h2);
    var p = document.getElementById("togglelogins");
    form.style.display = "none";
    h2.innerHTML = "Hi, " + users.userInfo.firstname + " Please Enter A Movie Title";
    p.style.display = "none";
    search.style.display = "inline";
  },
  fetchCurrentUser: function(){
    var url = "http://localhost:3000/currentuser";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var message = JSON.parse(xmlhttp.responseText);
        if(message.user !== undefined){
          users.userInfo = message.user;
        }
        users.requestMessage = message.message;
      }
      else if(xmlhttp.status == 401){
        var message = JSON.parse(xmlhttp.responseText);
        users.requestMessage = message.message;
      }
    };
  }
};

users.buttonEventListener();
