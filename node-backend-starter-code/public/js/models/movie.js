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
      movies.makeGifs();
    }
  },
  makeGifs: function(){
    var self = this;
    for(var i = 0; i < self.allMovies.Search.length; i ++){
      var movieArray = self.allMovies.Search;
      console.log(movieArray);
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
      heart.setAttribute=("class", movieArray[i].Title);
      h3.innerHTML = movieArray[i].Title;
      info.innerHTML = "Published Year: " + movieArray[i].Year;
      div.appendChild(h3);
      h3.appendChild(div2);
      div2.appendChild(poster);
      div2.appendChild(info);
      div2.appendChild(heart);
      movies.movieClick();
    }
  },
  button: document.getElementById("submit"),
  buttonClick: function(){
    var self = this;
    self.button.addEventListener("click", self.createMovies);
  },
  movieClick: function(){
    var self = this;
    var h3 = document.getElementsByTagName('h3');
    console.log(h3.length);
    for(var i = 0; i < h3.length; i++){
      var click = 0;
      var currentMovie = h3[i];
      console.log(currentMovie);
      currentMovie.addEventListener("click", function(e){
        !click ? ShowMovieInfo() : HideMovieInfo();

        function ShowMovieInfo(){
          e.target.children[0].style.display = "block";
          click++;
          console.log(click);
        }
        function HideMovieInfo(){
          e.target.children[0].style.display = "none";
          click = 0;
          console.log(click);
        }
      });
    }
  }
};
