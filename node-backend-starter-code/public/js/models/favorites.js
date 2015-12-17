var favs = {
  grabFavs: function(title){
    console.log("this is happening once");
    var fav = {
      title: title,
      favorite: true,
      user: users.userInfo
    };
    console.log(fav);
    var url = "http://localhost:3000/favorites";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var message = JSON.parse(xmlhttp.responseText);
        console.log(message);
      }
      else if(xmlhttp.status == 401){
        var message = JSON.parse(xmlhttp.responseText);
        console.log(message);
      }
    };
    xmlhttp.send(JSON.stringify(fav));
  }
};
