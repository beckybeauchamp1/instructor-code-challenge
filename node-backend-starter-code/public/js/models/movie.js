window.onload = function() {
  var Movie = function(info){
    this.title = info.title;
    this.year = info.year;
    this.id = info.movie_id;
    this.type =  info.type;
    this.poster = info.poster;
  };

  Movie.fetch = function(){
    var searchstring = document.getElementById("movie").value;

    var request = $.getJSON("http://localhost/3000/")
    .then(function(req, res){
      console.log("success, got the res: " + res);
      var movies = res;
      var allMovies = [];
      for(var i = 0; i < movies.length; i++){
        allMovies.push(new Movie(movies[i]));
      }
      return allMovies;
    })
    .fail(function(req, res){
      console.log("failed req: " + req + "and" + " failed res: " + res);
    });
    return request;
  };


  var allMovies = {};


  var button = document.getElementsByTagName("button");

  function createMovies(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.omdbapi.com/?s=despicable%20me', false);
    xhr.send();
    response = xhr.responseText;
    allMovies = JSON.parse(response);
    var title = response.Title;
    console.log(allMovies);

    for(var i = 0; i < allMovies.Search.length; i ++){
      var movieArray = allMovies.Search;
      var div = document.createElement('div');
      var info = document.createElement("p");
      var h2 = document.createElement('h2');
      h2.innerHTML = movieArray[i].Title;
      info.innerHTML = "Poster: " + movieArray[i].Poster + " Year: " + movieArray[i].Year;
      document.body.appendChild(div);
      div.appendChild(h2);
      div.appendChild(info);
    }
  }
  // need to add event listener
  createMovies();
};


// for(var i = 0; i < response.length; i++){
//   allMovies.push(new Movie(response[i]));
// }


//
// var button = document.getElementsByTagName('button');
// button.addEventListener("click", loadDoc());
// console.log(buton);

// function loadDoc(){
//   var xhr = new XMLHttpRequest();
//   // var searchstring = document.getElementById("movie").value;
//   // xhr.responseText = searchstring;
//   xhr.open("GET", searchstring, true);
//   xhr.send();
//   xhr.onreadystatechange = function(){
//     var DONE = 4;
//     var OK = 200;
//     if(xhr.readyState === DONE){
//       if(xhr.status ==== OK)
//       console.log(xhr.responseText);
//     }
//     else{
//       console.log("Error: " + xhr.status)
//     }
//   }
// }
