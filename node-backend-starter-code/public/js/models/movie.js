var movies = {
  // object, pushing all movies from search
  allMovies: {},
  click: 0,
  favsClick: 0,
  button: document.getElementById("submit"),
  setEventListener: function(){
    this.button.addEventListener("click", this.createMovies);
  },
  // ajax request to api to grab movies
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
  // I feel like there could be a better way to approach this problem,
  // but I am looping through each movie heading to add an event listener
  // in order to show and hide movie information
  movieClick: function(){
    var currentMovie = document.querySelectorAll('h3');
    for(var i = 0; i < currentMovie.length; i++){
      currentMovie[i].addEventListener("click", this.clickEventFunction);
    }
  },
  clickEventFunction: function(e) {
    if (e.target !== e.currentTarget) {
      var clickedItem = e.target.id;
      // if favorites click count is true(not zero), add favorite, otherwise remove favorite
      !movies.favsClick ? favs.addFavorite(e) : favs.eraseFavorite(e);
    }
    else {
      // if movies click is true, show movie information, otherwise hide
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
  }
};

movies.setEventListener();
movies.movieClick();
