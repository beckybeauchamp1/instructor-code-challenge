var test;
var movies = {
  // object, pushing all movies from search
  allMovies: {},
  click: 0,
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
      console.log(clickedItem);
      movies.click ? movies.addFavorite(e) : movies.eraseFavorite(e);
    }
    else {
      !movies.click ? ShowMovieInfo(e) : HideMovieInfo(e);
    }
    function ShowMovieInfo(e){
      movies.click++;
      test = e.target;
      e.target.children[0].style.display = "block";
      e.stopPropagation();
    }
    function HideMovieInfo(e){
      movies.click = 0;
      e.target.children[0].style.display = "none";
      console.log(click);
      e.stopPropagation();
    }
  },
  addFavorite: function(e){
    var title = e.target.id;
    console.log(title);
    e.target.style.color = "red";
    e.target.setAttribute("class", "favorited");
    favoritesView.showFavorites(title);
    favs.grabFavs(title);
  },
  eraseFavorite: function(e){
    var title = e.target.id;
    e.target.style.color = "white";
    e.target.classList.remove("favorited");
  }

};

movies.setEventListener();
movies.movieClick();
