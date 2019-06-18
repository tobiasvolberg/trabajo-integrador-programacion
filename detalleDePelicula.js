window.addEventListener("load",function(){
  // Obtengo la info de local storage
    var json = localStorage.getItem("pelisFavoritos")

    // Si ya habia favoritos..
    if (json != null) {
      // Desempaquetar el string JSON
      var objLit = JSON.parse(json)

      // De todo el objeto literal me interesa EL ARRAY
      var favoritos = objLit.carac

    } else {
      // Si no habia creo el listado como VACIO
      var favoritos = []
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
  var urlParams = new URLSearchParams(window.location.search);

  var query = urlParams.get('id');

  fetch("https://api.themoviedb.org/3/movie/"+query+"?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US")
  .then(function(respuesta) {
    return respuesta.json()
  })
  .then(function(info) {
    var titulo = info
    console.log(titulo);
    var generos = titulo.genres
    console.log(generos);
    document.querySelector(".detalles").innerHTML += "<li class='tituloDetalleDePeli'>"+titulo.title+"</li><li><img class='imagenDetalleDePeli'src='https://image.tmdb.org/t/p/w500/" + titulo.poster_path + "' alt=''><li class='overviewDePeli'>"+ titulo.overview +"</li><li class='idiomaDePeli'>"+ "Idioma utilizado: "+titulo.original_language+"</li><li class='generoDePeli'>"+"Genero:<ul class='generosUl'></ul></li><li class='estrenoDePeli'>"+"Fecha de estreno: "+titulo.release_date+"</li></li>"

    li = "<li>"
    for (var i = 0; i < generos.length; i++) {
      li += generos[i].name + ", "
    }
    document.querySelector("li.generoDePeli ul").innerHTML += li
    li += "</li>"

  })
  .catch(function(error){
    console.log("El error fue:" + error)
  })

  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

fetch("https://api.themoviedb.org/3/movie/" + query + "/recommendations?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&page=1")
.then(function(respuesta) {
  return respuesta.json()
})
.then(function(info) {
  var titulo = info.results

  var li =""
  for (var i = 0; i < titulo.length; i++) {
    li = "<li class='peli-recomendada'>"


    li += "<img src='https://image.tmdb.org/t/p/w500/" +titulo[i].backdrop_path +"'  uk-cover>"
    li += "<div class='uk-position-bottom uk-position-medium uk-text-center uk-light'>"
    li += "<a href='detalleDePelicula.html?id="+titulo[i].id+"'>"
    li += "<h3 class='uk-margin-remove'>" + titulo[i].title + "</h3>"
    li += "<p class='uk-margin-remove'>"+titulo[i].overview+"</p>"
    li += "</a>"
    li += "</div>"

    li += "</li>"

    document.querySelector("#testtest").innerHTML += li


  }
})
.catch(function(error){
  console.log("El error fue:" + error)
})
fetch("https://api.themoviedb.org/3/movie/"+query+"/videos?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US")
.then(function(respuesta) {
  return respuesta.json()
})
.then(function(info) {
  var titulo = info.results
  var key = titulo[0].key
  document.querySelector("iframe").src = "https://www.youtube.com/embed/"+key+""

})
.catch(function(error){
  console.log("El error fue:" + error)
})


})
