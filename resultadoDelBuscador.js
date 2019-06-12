window.addEventListener("load",function(){
  var urlParams = new URLSearchParams(window.location.search);

  var query = urlParams.get('id');

  console.log(query);
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

  fetch("https://api.themoviedb.org/3/search/movie?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&page=1&include_adult=false")
  .then(function(respuesta) {
    return respuesta.json()
  })
  .then(function(info) {
  var titulo = info.results
  console.log(titulo);

  for (var i = 0; i < titulo.length; i++) {
    document.querySelector("#carruselhome ul").innerHTML += '<li><img src="' +"https://image.tmdb.org/t/p/w500/" +titulo[i].backdrop_path +'" alt="" uk-cover><div class="uk-position-bottom uk-position-medium uk-text-center uk-light"><h3 class="uk-margin-remove">' + titulo[i].title + '</h3><p class="uk-margin-remove">'+titulo[i].overview+'</p></div></li>'
  }

  })
  .catch(function(error){
    console.log("El error fue:" + error)
  })


})
