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

  })
