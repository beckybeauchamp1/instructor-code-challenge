var users = {
  // my json response to signup or login
  userInfo: {},
  // this is an object for my ajax response request message. I plan to display messages to users.
  requestMessage: {},
  // Changing the login displays for signup versus login for current users
  changeLogins: function(){
    var button = document.getElementById("togglelogins");
    var click = 0;
    var signup = document.getElementsByClassName("signupform")[0];
    var login = document.getElementsByClassName('loginform')[0];
    var toggleLoginsParagraph = document.getElementById("togglelogins");
    var submitButton = document.getElementsByClassName("signupsubmit")[0];
    button.addEventListener("click", function(evt){
      evt.preventDefault();
      if(!click) {
        login.style.display = "inline";
        signup.style.display = "none";
        toggleLoginsParagraph.innerHTML = "Please Sign Up To Find Movies!";
        submitButton.id = "login";
        click++;
      }
      else {
        signup.style.display = "inline";
        login.style.display = "none";
        toggleLoginsParagraph.innerHTML = "Click Here To Log In!";
        submitButton.id ="signup";
        click = 0;
      }
    });
  },
  buttonEventListener: function(){
    var submitButton = document.getElementsByClassName("signupsubmit")[0];
    submitButton.addEventListener("click", function(evt){
      evt.preventDefault();
      var self = this;
      var type = submitButton.id;
      console.log(submitButton);
      console.log(submitButton.id);
      console.log(type);
      var firstname = document.getElementById("firstname").value;
      var lastname = document.getElementById("lastname").value;
      var email =  document.getElementById("email").value;
      var password = document.getElementById("password").value;
      // signup had bugs, so placing function hideSignUp HERE:
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
        var url = "http://localhost:3000/" + type;
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
    });
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
    h2.innerHTML = "Welcome! Please Enter A Movie Title";
    p.style.display = "none";
    search.style.display = "inline";
  },
};
