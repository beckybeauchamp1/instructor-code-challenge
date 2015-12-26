var test;
var movies = {
  // object, pushing all movies from search
  allMovies: {},
  click: 0,
  favsClick: 0,
  createMovies: function(){
    var search = document.getElementById("movie").value;
    var url = 'http://www.omdbapi.com/?s=' + search;
    if(search !== ""){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send();
      var response = xhr.responseText;
      movies.allMovies = JSON.parse(response);
      moviesView.makeGifs();
    }
  },
  button: document.getElementById("submit"),
  setEventListener: function(){
    var self = this;
    self.button.addEventListener("click", self.createMovies);
  },
  movieClick: function(){
    var currentMovie = document.querySelectorAll('h3');
    for(var i = 0; i < currentMovie.length; i++){
      currentMovie[i].addEventListener("click", this.clickEventFunction);
    }
  },
  clickEventFunction: function(e) {
    if (e.target !== e.currentTarget) {
      var clickedItem = e.target.id;
      !movies.favsClick ? movies.addFavorite(e) : movies.eraseFavorite(e);
    }
    else {
      !movies.click ? ShowMovieInfo(e) : HideMovieInfo(e);
    }
    function ShowMovieInfo(e){
      movies.click++;
      movies.favsClick = 0;
      test = e.target;
      e.target.children[0].style.display = "block";
      e.stopPropagation();
    }
    function HideMovieInfo(e){
      movies.click = 0;
      e.target.children[0].style.display = "none";
      e.stopPropagation();
    }
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

movies.setEventListener();
movies.movieClick();
