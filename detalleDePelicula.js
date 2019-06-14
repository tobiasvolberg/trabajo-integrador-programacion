window.addEventListener("load",function(){
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

    document.querySelector(".detalles").innerHTML += "<li class='tituloDetalleDePeli'>"+titulo.title+"</li><li><img class='imagenDetalleDePeli'src='https://image.tmdb.org/t/p/w500/" + titulo.poster_path + "' alt=''><li class='overviewDePeli'>"+ titulo.overview +"</li><li class='idiomaDePeli'>"+ "Idioma utilizado: "+titulo.original_language+"</li><li class='generoDePeli'>"+"Genero: "+titulo.genres.name+"</li><li class='estrenoDePeli'>"+"Fecha de estreno: "+titulo.release_date+"</li></li>"
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

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




})
