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




    for (var i = 0; i < favoritos.length; i++) {
    var idPelis = favoritos[i]

    fetch("https://api.themoviedb.org/3/movie/"+idPelis+"?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US")
      .then(function(respuesta) {
        return respuesta.json()
      })
      .then(function(pelicula) {
        console.log(pelicula);
        var li =""
          li = "<li>"
          li += "<img id='carrusel1' src='https://image.tmdb.org/t/p/w500/" +pelicula.poster_path +"'  uk-cover>"
          li += "<div class='uk-position-bottom uk-position-medium uk-text-center uk-light'>"
          li += "<a href='detalleDePelicula.html?id="+pelicula.id+"'>"
          li += "<h3 class='uk-margin-remove'>" + pelicula.title + "</h3>"
          li += "<p class='uk-margin-remove'>"+pelicula.overview+"</p>"
          li += "</a>"
          li += "</div>"
          li += "</li>"
        })
    }

      .catch(function(error){
        console.log("El error fue:" + error)
      })

      // Pregunto si la peli ya era favorito
      if (favoritos.indexOf(id) == -1) {
        // Si no era favorito digo "Queres agregarlo?"
        // OJO QUE COMO HAY MUCHOS BOTONES EL BOTON TIENE UNA REFERENCIA DEL idGif
        document.querySelector("div.botonesDetalle").innerHTML += "<button idPelis=" + id + " class='favorito' id='botoncitoFavoritos'>Agregar a Favoritos</button><br>"
      } else {
        // Si ya era, digo "Queres quitarlo?"
        document.querySelector("div.botonesDetalle").innerHTML += "<button idPelis=" + id + " class='favorito' id='botoncitoFavoritos'>Quitar de Favoritos</button><br>"
      }

      // Ahora que ya los cree, obtengo todos los botones
      var botones = document.querySelectorAll("button.favorito")

      // Voy a recorrer esos botones
      for (var i = 0; i < botones.length; i++) {
        // A cada boton le pongo un evento onclick
        botones[i].onclick = function() {
          // Obtiene en que peli se clickeo
          var idPelis = this.getAttribute("idPelis")

          // Si le peli AUN NO ES FAVORITO
          if (favoritos.indexOf(idPelis) == -1) {
            // Lo agrega
            favoritos.push(idPelis)
            // Actualiza el boton
            this.innerHTML = "Quitar de Favoritos"
          } else {
            // Lo quita
            var posicion = favoritos.indexOf(idPelis)
            favoritos.splice(posicion,1)
            // Actualiza el boton
            this.innerHTML = "Agregar a Favoritos"
          }

          // Lo vuelvo a pasar a OBJ literal

          obj = {
            carac: favoritos
          }

          // LO transformo en JSON
          json = JSON.stringify(obj)

          // Lo guardo en Local Storage
          localStorage.setItem("pelisFavoritos", json)

          console.log(localStorage);

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
