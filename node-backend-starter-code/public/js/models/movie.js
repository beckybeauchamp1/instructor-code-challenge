var movies = {
  // object, pushing all movies from search
  allMovies: {},

  createMovies: function(){
    var search = document.getElementById("movie").value;
    var url = 'http://www.omdbapi.com/?s=' + search;
    if(search !== ""){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send();
      var response = xhr.responseText;
      movies.allMovies = JSON.parse(response);
      movies.makeGifs();
    }
  },
  makeGifs: function(){
    var self = this;
    self.addFavoritesButton();
    for(var i = 0; i < self.allMovies.Search.length; i ++){
      var movieArray = self.allMovies.Search;
      var div= document.getElementsByClassName("movies")[0];
      var div2 = document.createElement("div");
      div2.setAttribute("class", i);
      div2.style.display = "none";
      var info = document.createElement("p");
      var poster = document.createElement("img");
      poster.src= movieArray[i].Poster;
      var h3 = document.createElement('h3');
      h3.setAttribute("class", i);
      var heart = document.createElement("p");
      heart.innerHTML = "&#10084";
      heart.setAttribute("class", "favorites");
      heart.setAttribute("id", movieArray[i].Title);
      h3.innerHTML = movieArray[i].Title;
      info.innerHTML = "Published Year: " + movieArray[i].Year;
      div.appendChild(h3);
      h3.appendChild(div2);
      div2.appendChild(poster);
      div2.appendChild(info);
      h3.appendChild(heart);
      movies.movieClick();
    }
    // calling event Listener when movies and favorite options appear
    favs.clickSave();
  },
  addFavoritesButton: function(){
    var button = document.createElement("button");
    var div= document.getElementsByClassName("forms")[0];
    button.innerHTML = "Save Favorites";
    button.setAttribute("class", "saveFavorites");
    div.appendChild(button);
  },
  button: document.getElementById("submit"),
  buttonClick: function(){
    var self = this;
    self.button.addEventListener("click", self.createMovies);
  },
  movieClick: function(){
    var self = this;
    var currentMovie = document.querySelectorAll('h3');
    var currentFavorite = document.querySelectorAll("p");
    var click = 0;
    for(var i = 0; i < currentMovie.length; i++){
      currentMovie[i].addEventListener("click", clickEventFunction, false);
    }

    function clickEventFunction(e) {
      if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
        click ? movies.addFavorite(e) : movies.eraseFavorite(e);
      }
      e.stopPropagation();
      !click ? ShowMovieInfo(e) : HideMovieInfo(e);
    }

    function ShowMovieInfo(e){
      click++;
      e.target.children[0].style.display = "block";
    }
    function HideMovieInfo(e){
      click = 0;
      e.target.children[0].style.display = "none";
      console.log(click);
    }

  },
  addFavorite: function(e){
    var title = e.target.id;
    console.log(title);
    e.target.style.color = "red";
    e.target.setAttribute("class", "favorited");
  },
  eraseFavorite: function(e){
    var title = e.target.id;
    e.target.style.color = "white";
    e.target.classList.remove("favorited");
  }

};
