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

    document.querySelector(".detalles").innerHTML += "<li>"+titulo.title+"</li><li><img src='https://image.tmdb.org/t/p/w500/" + titulo.poster_path + "' alt=''></li>"
  })
  .catch(function(error){
    console.log("El error fue:" + error)
  })




})
