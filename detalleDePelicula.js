window.addEventListener("load",function(){

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
  // Obtengo la info de local storage
    var favoritos = localStorage.getItem("favoritos")

    // Si ya habia favoritos..
    if (favoritos != null) {
      // Desempaquetar el string JSON
      favoritos = JSON.parse(favoritos).listadoFavoritos


    } else {
      // Si no habia creo el listado como VACIO
      favoritos = []
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
      li += generos[i].name + " "
    }
    document.querySelector("li.generoDePeli ul").innerHTML += li
    li += "</li>"

    if (favoritos.indexOf(query) >= 0) {

                          document.querySelector(".botonesDetalle").innerHTML += "<button class='favorito' id='botoncitoFavoritos' idPeli=" + query + ">Quitar de Favoritos</button><br>"
                          } else {
                          document.querySelector(".botonesDetalle").innerHTML += "<button class='favorito btn btn-primary' id='botoncitoFavoritos' idPeli=" + query + ">Agregar a Favoritos</button><br>"
                          }
                          console.log("hola");
                          // IDEA: document.querySelector("section.detalle").innerHTML += "<img src=" + url + ">"
                          // Bien! Ya cree todos los botones (Ojo que igual ustedes van a tener uno solo). Entonces los obtengo con querySelectorAll
                          var boton = document.querySelector("button.favorito")

                             // A CADA BOTON le pongo un evento onclick

                            boton.onclick = function(event) {

               // Obtengo en que GIF se clickeo
                              var idPeli = this.getAttribute("idPeli")
                              // Si no lo tenia ya como preferido
                              if (favoritos.indexOf(idPeli) == -1) {
                                //Agrego el gif nuevo!
                                favoritos.push(idPeli)
                                //Y cambio el texto del boton
                                this.innerHTML = "Quitar de Favoritos"
                              } else {
                                // Lo tengo que quitar!!!
                                var index = favoritos.indexOf(idPeli);
                                favoritos.splice(index, 1);
                                // Y cambio el texto del boton
                                this.innerHTML = "Agregar a Favoritos"
                              }
                              // Aca transformo el array en un obj literal para poder guardarlo
                              favoritos = {
                                "listadoFavoritos" : favoritos
                              }
                              // Y lo transformo en string para poder guardarlos
                              favoritos = JSON.stringify(favoritos)
                              // Y aca guardo en localStorage
                              localStorage.setItem("favoritos", favoritos)
                              // Y devuelvo en la variable el array real
                              favoritos = JSON.parse(favoritos).listadoFavoritos
                            }

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

document.querySelector("form.buscadorr").onsubmit = function(e) {
    var buscadorInput = document.querySelector("#buscadorrr")

    if (buscadorInput.value.length <= 3) {
      e.preventDefault()
      UIkit.notification({
        message: 'Minimo 3 caracteres',
        status: 'warning',
        pos: 'top-center',
        timeout: 3000,
      })
      // var myOwnInterval = setTimeInterval(tiempo, 3000)
      // function tiempo() {
      //   prompt("Minimo 3 caracteres")
      // }
      // clearTimeInterval(myOwnInterval)
    }

}
// document.querySelector("button.enviar-login").onclick = function() {
//   var nombreDelUsuario = document.getElementById("Nombre").value
//   console.log(nombreDelUsuario);
//   // if (localStorage.getItem("userName") != null) {
//   //   document.querySelector("#botonLogIn").style.display="block"
//   //   document.querySelector('#bienvenida').style.display = "none"
//   // }
//   // else {
//   //   document.querySelector("#botonLogIn").style.display="none"
//   //   document.querySelector('#bienvenida').style.display = "block"
//   //   document.querySelector('#bienvenida').innerHTML = "Bienvenido, " + nombreDelUsuario
//   //
//   //
//   //
//   // }
//   if (nombreDelUsuario == "") {
// document.querySelector('#bienvenida').style.display = "none"
// document.querySelector("#botonLogIn").style.display="block"
//
//
//   }
//   else {
//     document.querySelector('#bienvenida').innerHTML = "Bienvenido, " + nombreDelUsuario
//     document.querySelector(".close").click()
//     document.querySelector("#botonLogIn").style.display="none"
//
//     localStorage.setItem("userName", nombreDelUsuario)
//
//   }
//
// }

//LogIn
if (localStorage.getItem("usuario")!=null) {
  document.querySelector("#botonLogIn").style.display="none"
  document.querySelector("li.favoritos").style.display="block"
  var usuario = document.querySelector("#bienvenida")
  usuario.innerHTML = "Bienvenido " + localStorage.getItem("usuario")

}

var formulario = document.querySelector(".formularioDeLogIn")
var nombre = formulario.querySelector("input[name='nombre']")
var email = formulario.querySelector("input[name='email']")
var mailformat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

formulario.onsubmit = function(e){
e.preventDefault()
if (nombre.value == "" && email.value.match(mailformat)== null) {
e.preventDefault()
  UIkit.notification({
    message: 'Por favor, completar los campos',
    status: 'warning',
    pos: 'top-right',
    timout: 2000,
  })
}
else if (nombre.value == "") {
  e.preventDefault()
  UIkit.notification({
    message: 'Por favor, ingrese un nombre',
    status: 'warning',
    pos: 'top-right',
    timout: 2000,
  })
}
else if (email.value.match(mailformat)== null) {
  e.preventDefault()
  UIkit.notification({
    message: 'Por favor, ingrese un email',
    status: 'warning',
    pos: 'top-right',
    timout: 2000,
  })
}
else {
  e.preventDefault()
  localStorage.setItem('usuario', nombre.value)
  document.querySelector("#botonLogIn").style.display = "none"
  document.querySelector("li.favoritos").style.display="block"
  var usuario = document.querySelector("#bienvenida")
  usuario.innerHTML = "Bienvenido " + localStorage.getItem("usuario")
}
}
})
