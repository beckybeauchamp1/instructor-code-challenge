var favoritesView = {
  addFavoritesButton: function(){
    var button = document.createElement("button");
    var div= document.getElementsByClassName("forms")[0];
    button.innerHTML = "Save Favorites";
    button.setAttribute("class", "saveFavorites");
    div.appendChild(button);
  },
  showFavorites: function(title){
    var favoritesDiv = document.getElementsByClassName("favoritesDiv")[0];
    var h4 = document.createElement("h4");
    h4.innerHTML = title;
    favoritesDiv.appendChild(h4);
  }
};
