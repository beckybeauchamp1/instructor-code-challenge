var users = {
  // my json response to signup or login
  userInfo: {},
  // this is an object for my ajax response request message. I plan to display messages to users.
  requestMessage: {},
  // Changing the login displays for signup versus login for current users
  changeLogins: function(){
    var button = document.getElementById("togglelogins");
    var click = 0;
    var login = document.getElementsByClassName('loginform')[0];
    var heading = document.getElementsByTagName("form")[0].children[0];
    var toggleLoginsParagraph = document.getElementById("togglelogins");
    var submitButton = document.getElementsByClassName("signupsubmit")[0];
    var signupNames = document.getElementsByClassName("signup-users-name");
    button.addEventListener("click", function(){
      if(!click) {
        heading.innerHTML = "Sign Up";
        for(var i = 0; i < signupNames.length; i++){
          signupNames[i].style.display = "block";
        }
        toggleLoginsParagraph.innerHTML = " Click Here To Log In!";
        submitButton.id = "signup";
        click++;
      }
      else {
        heading.innerHTML = "Log In";
        toggleLoginsParagraph.innerHTML = "Please Sign Up To Find Movies!";
        for(var i = 0; i < signupNames.length; i++){
          signupNames[i].style.display = "none";
        }
        submitButton.id ="login";
        click = 0;
      }
    });
  },
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
          users.requestMessage = message.message;
          users.hideSignUp();
        }
        else if(xmlhttp.status == 401){
          var message = JSON.parse(xmlhttp.responseText);
          users.requestMessage = message.message;
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
    div.appendChild(h2);
    var p = document.getElementById("togglelogins");
    form.style.display = "none";
    h2.innerHTML = "Hi, " + users.userInfo.firstname + " Please Enter A Movie Title";
    p.style.display = "none";
    search.style.display = "inline";
  }
};

users.changeLogins();
users.buttonEventListener();
