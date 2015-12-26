var favs = {
  // this function is an ajax request to save favorites, should be refactor
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
  },
  addFavorite: function(e){
    if(e.target.classList[0] === "favorites"){
      movies.favsClick++;
      var title = e.target.id;
      e.target.style.color = "red";
      e.target.setAttribute("class", "favorited");
      favoritesView.showFavorites(title);
      favs.grabFavs(title);
      e.stopPropagation();
    }
  },
  eraseFavorite: function(e){
    if(e.target.classList[0] === "favorited"){
      movies.favsClick = 0;
      var title = e.target.id;
      e.target.style.color = "white";
      e.target.setAttribute("class", "favorites");
      favoritesView.eraseFavs(title);
      e.stopPropagation();
    }
  }
};
