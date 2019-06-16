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

  fetch("https://api.themoviedb.org/3/discover/movie?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="+query)
  .then(function(respuesta) {
    return respuesta.json()
  })
  .then(function(info) {
  var titulo = info.results
  console.log(titulo);

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

    // document.querySelector("#carruselhome ul").innerHTML += '<li><img src="' +"https://image.tmdb.org/t/p/w500/" +titulo[i].backdrop_path +'" alt="" uk-cover><div class="uk-position-bottom uk-position-medium uk-text-center uk-light"><h3 class="uk-margin-remove">' + titulo[i].title + '</h3><p class="uk-margin-remove">'+titulo[i].overview+'</p></div></li>'
  }

  })
  .catch(function(error){
    console.log("El error fue:" + error)
  })


})
