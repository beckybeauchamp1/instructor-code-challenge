var favs = {
  grabFavs: function(title){
    console.log("FAVORITE " + title);
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
    xmlhttp.send(JSON.stringify(fav));
    var response = xmlhttp.responseText;
    JSON.parse(response);
    console.log(response);
  },
};
