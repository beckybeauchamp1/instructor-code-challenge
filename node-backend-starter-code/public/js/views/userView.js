var usersView = {
  click: 0,
  changeLogins: function(button, login, heading, toggleLoginsParagraph, submitButton, signupNames){
    var self = this;
    button.addEventListener("click", function(){
      if(!self.click) {
        heading.innerHTML = "Sign Up";
        for(var i = 0; i < signupNames.length; i++){
          signupNames[i].style.display = "block";
        }
        toggleLoginsParagraph.innerHTML = " Click Here To Log In!";
        submitButton.id = "signup";
        self.click++;
      }
      else {
        heading.innerHTML = "Log In";
        toggleLoginsParagraph.innerHTML = "Please Sign Up To Find Movies!";
        for(var i = 0; i < signupNames.length; i++){
          signupNames[i].style.display = "none";
        }
        submitButton.id ="login";
        self.click = 0;
      }
    });
  },
  defineLoginElements: function(){
    var button = document.getElementById("togglelogins");
    var login = document.getElementsByClassName('loginform')[0];
    var heading = document.getElementsByTagName("form")[0].children[0];
    var toggleLoginsParagraph = document.getElementById("togglelogins");
    var submitButton = document.getElementsByClassName("signupsubmit")[0];
    var signupNames = document.getElementsByClassName("signup-users-name");
    this.changeLogins(button, login, heading, toggleLoginsParagraph, submitButton, signupNames);
  },
  displayMessages: function(){
    if(users.requestMessage !== undefined){
      var messageDiv = document.createElement("div");
      var heading = document.createElement("h3");
      var mainDiv = document.getElementsByClassName("userlogin")[0];
      mainDiv.appendChild(messageDiv);
      messageDiv.appendChild(heading);
      messageDiv.setAttribute("class", "messages");
      heading.innerHTML = users.requestMessage;
      setTimeout(function(){
        messageDiv.style.display = "none";
      }, 4000);
    }
  }
};

usersView.defineLoginElements();
