window.addEventListener("load",function(){
  var favoritos = localStorage.getItem("favoritos")
  favoritos = JSON.parse(favoritos).listadoFavoritos

  var article = ""
for (var i = 0; i < favoritos.length; i++) {
console.log(favoritos);


fetch( "https://api.themoviedb.org/3/movie/" + favoritos[i] + "?api_key=72c0f0e3c6590f5af907c8bd0778da1d&language=en-US")
.then(function(respuesta) {
  return respuesta.json()
})
.then(function(informacion) {
  console.log(informacion);



  var li =""
  li = "<li class='peli-recomendada'>"


  li += "<img src='https://image.tmdb.org/t/p/w500/" +informacion.poster_path +"'  uk-cover>"
  li += "<div class='uk-position-bottom uk-position-medium uk-text-center uk-light'>"
  li += "<a href='detalleDePelicula.html?id="+informacion.id+"'>"
  li += "<h3 class='uk-margin-remove'>" + informacion.title + "</h3>"
  li += "<p class='uk-margin-remove'>"+informacion.overview+"</p>"
  li += "</a>"
  li += "</div>"

  li += "</li>"

  document.querySelector("#carruselhome ul").innerHTML += li
            })




        .catch(function(error) {
        console.log("Error: " + error);
          })

}


        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US")
        .then(function(respuesta) {
          return respuesta.json()
        })
        .then(function(info) {
          var generos = info.genres

          for (var i = 0; i < generos.length; i++) {
            document.querySelector(".dropdown-menu").innerHTML += "<a class='dropdown-item' href='peliculasPorGenero.html?id="+generos[i].id+"'>"+ generos[i].name +"</a>"
          }
        })
        .catch(function(error){
          console.log("El error fue:" + error)
        })

  })
