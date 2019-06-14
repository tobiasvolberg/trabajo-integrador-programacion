window.onload = function(){
  // Obtengo la info de local storage
  var json = localStorage.getItem("gifsFavoritos")

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
  //jQuery
  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('Inicia sesion ')
    modal.find('.modal-body input').val(recipient)
  })

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

  fetch("https://api.themoviedb.org/3/movie/popular?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&page=1")
  .then(function(respuesta) {
    return respuesta.json()
  })
  .then(function(info) {
    var titulo = info.results

    var li =""
    for (var i = 0; i < titulo.length; i++) {
      li = "<li>"


      li += "<img id='carrusel1' src='https://image.tmdb.org/t/p/w500/" +titulo[i].poster_path +"'  uk-cover>"
      li += "<div class='uk-position-bottom uk-position-medium uk-text-center uk-light'>"
      li += "<a href='detalleDePelicula.html?id="+titulo[i].id+"'>"
      li += "<h3 class='uk-margin-remove'>" + titulo[i].title + "</h3>"
      li += "<p class='uk-margin-remove'>"+titulo[i].overview+"</p>"
      li += "</a>"
      li += "</div>"
      li += "</li>"

      document.querySelector("#carruselhome ul").innerHTML += li


    }
  })
  .catch(function(error){
    console.log("El error fue:" + error)
  })

  fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&page=1")
  .then(function(respuesta) {
    return respuesta.json()
  })
  .then(function(info) {
    var titulo = info.results


    for (var i = 0; i < titulo.length; i++) {
      li = "<li>"


      li += "<img src='https://image.tmdb.org/t/p/w500/" +titulo[i].poster_path +"'  uk-cover>"
      li += "<div class='uk-position-bottom uk-position-medium uk-text-center uk-light'>"
      li += "<a href='detalleDePelicula.html?id="+titulo[i].id+"'>"
      li += "<h3 class='uk-margin-remove'>" + titulo[i].title + "</h3>"
      li += "<p class='uk-margin-remove'>"+titulo[i].overview+"</p>"
      li += "</a>"
      li += "</div>"
      li += "</li>"

      document.querySelector("#carruselhome2 ul").innerHTML += li
    }
  })
  .catch(function(error){
    console.log("El error fue:" + error)
  })

  fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&page=1")
  .then(function(respuesta) {
    return respuesta.json()
  })
  .then(function(info) {
    var titulo = info.results

    for (var i = 0; i < titulo.length; i++) {
      li = "<li>"


      li += "<img src='https://image.tmdb.org/t/p/w500/" +titulo[i].poster_path +"'  uk-cover>"
      li += "<div class='uk-position-bottom uk-position-medium uk-text-center uk-light'>"
      li += "<a href='detalleDePelicula.html?id="+titulo[i].id+"'>"
      li += "<h3 class='uk-margin-remove'>" + titulo[i].title + "</h3>"
      li += "<p class='uk-margin-remove'>"+titulo[i].overview+"</p>"
      li += "</a>"
      li += "</div>"
      li += "</li>"

      document.querySelector("#carruselhome3 ul").innerHTML += li
    }
  })
  .catch(function(error){
    console.log("El error fue:" + error)
  })


}



//LOGIN//
document.querySelector("button.enviar-login").onclick = function() {
  var nombreDelUsuario = document.getElementById("Nombre").value
  console.log(nombreDelUsuario);
  if (nombreDelUsuario == "") {

  }
  else {
    document.querySelector('#bienvenida').innerHTML = "Bienvenido, " + nombreDelUsuario
    document.querySelector(".close").click()

    localStorage.setItem("userName", nombreDelUsuario)

  }

}

if (localStorage.getItem("userName") != null) {
  document.querySelector('#bienvenida').innerHTML = "Bienvenido, " + localStorage.getItem("userName")
}
