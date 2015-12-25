var moviesView = {
  movieArray: [],
  makeGifs: function(){
    for(var index = 0; index < movies.allMovies.Search.length; index ++){
      moviesView.movieArray = movies.allMovies.Search;
      moviesView.createElements(index);
    }
  },
  createElements: function(index){
    var childDiv = document.createElement("div");
    var paragraph = document.createElement("p");
    var poster = document.createElement("img");
    var heading = document.createElement('h3');
    var heart = document.createElement("p");
    moviesView.setAttributes(childDiv, paragraph, poster, heading, heart, index);
  },
  setAttributes: function(childDiv, paragraph, poster, heading, heart, index){
    poster.src= moviesView.movieArray[index].Poster;
    heart.setAttribute("class", "favorites");
    heart.setAttribute("id", moviesView.movieArray[index].Title);
    childDiv.setAttribute("class", "movie-titles");
    moviesView.setContent(childDiv, paragraph, poster, heading, heart, index);
  },
  setContent: function(childDiv, paragraph, poster, heading, heart, index){
    heart.innerHTML = "&#10084";
    heading.innerHTML = moviesView.movieArray[index].Title;
    paragraph.innerHTML = "Published Year: " + moviesView.movieArray[index].Year;
    childDiv.style.display = "none";
    moviesView.appendNew(childDiv, paragraph, poster, heading, heart, index);
  },
  appendNew: function(childDiv, paragraph, poster, heading, heart, index){
    var div= document.getElementsByClassName("movies")[0];
    div.appendChild(heading);
    heading.appendChild(childDiv);
    childDiv.appendChild(poster);
    childDiv.appendChild(paragraph);
    childDiv.appendChild(heart);
    movies.movieClick();
  }
};
