var favs = {
  addFavorites: function(evt){
    evt.preventDefault();
    var self = this;
    var favorites = document.getElementsByClassName("favorited");
    if(favorites.length){
      for(var i = 0; i < favorites.length; i ++){
        var favorite = favorites[i];
        var title = favorites[i].id;
        favs.grabFavs(title);
      }
    }
  },
  clickSave: function(){
    var button = document.getElementsByClassName("saveFavorites")[0];
    button.addEventListener("click", favs.addFavorites);
  },
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
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var message = JSON.parse(xmlhttp.responseText);
      }
      else if(xmlhttp.status == 401){
        var message = JSON.parse(xmlhttp.responseText);
      }
    };
    xmlhttp.send(JSON.stringify(fav));
  }
};
