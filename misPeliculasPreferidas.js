window.addEventListener("load",function(){
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

  // Pregunto si el gif ya era favorito
        if (favoritos.indexOf(id) == -1) {
          // Si no era favorito digo "Queres agregarlo?"
          // OJO QUE COMO HAY MUCHOS BOTONES EL BOTON TIENE UNA REFERENCIA DEL idGif
          document.querySelector("div").innerHTML += "<button idGif=" + id + " class='favorito'>Agregar a Favoritos</button><br>"
        } else {
          // Si ya era, digo "Queres quitarlo?"
          document.querySelector("div").innerHTML += "<button idGif=" + id + " class='favorito'>Quitar de Favoritos</button><br>"
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
