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
  li = "<li>"

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

        document.querySelector("button.enviar-login").onclick = function() {
          var nombreDelUsuario = document.getElementById("Nombre").value
          console.log(nombreDelUsuario);
          // if (localStorage.getItem("userName") != null) {
          //   document.querySelector("#botonLogIn").style.display="block"
          //   document.querySelector('#bienvenida').style.display = "none"
          // }
          // else {
          //   document.querySelector("#botonLogIn").style.display="none"
          //   document.querySelector('#bienvenida').style.display = "block"
          //   document.querySelector('#bienvenida').innerHTML = "Bienvenido, " + nombreDelUsuario
          //
          //
          //
          // }
          if (nombreDelUsuario == "") {
        document.querySelector('#bienvenida').style.display = "none"
        document.querySelector("#botonLogIn").style.display="block"


          }
          else {
            document.querySelector('#bienvenida').innerHTML = "Bienvenido, " + nombreDelUsuario
            document.querySelector(".close").click()
            document.querySelector("#botonLogIn").style.display="none"

            localStorage.setItem("userName", nombreDelUsuario)

          }

        }



  })
