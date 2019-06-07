window.onload = function(){
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
      document.querySelector(".dropdown-menu").innerHTML += "<a class='dropdown-item' href=''>"+ generos[i].name +"</a"
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
    console.log(titulo);

    for (var i = 0; i < titulo.length; i++) {
      document.querySelector("#carruselhome ul").innerHTML += '<li><img src="' +"https://image.tmdb.org/t/p/w500/" +titulo[i].poster_path +'" alt="" uk-cover><div class="uk-position-bottom uk-position-medium uk-text-center uk-light"><h3 class="uk-margin-remove">' + titulo[i].title + '</h3><p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div></li>'
    }
  })
  .catch(function(error){
    console.log("El error fue:" + error)
  })


}
