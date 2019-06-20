window.onload = function(){
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


      li += "<img id='carrusel2' src='https://image.tmdb.org/t/p/w500/" +titulo[i].poster_path +"'  uk-cover>"
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


      li += "<img id='carrusel3' src='https://image.tmdb.org/t/p/w500/" +titulo[i].poster_path +"'  uk-cover>"
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





//LOGIN//
// function emailIsValid (e) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
// }
//
//
// document.querySelector("button.enviar-login").onclick = function(e) {
//   e.preventDefault()
//   var nombreDelUsuario = document.getElementById("Nombre").value
//   var email = document.getElementById("Email").value
//   console.log(nombreDelUsuario);
//   console.log(email);
//   if (nombreDelUsuario=="" && emailIsValid(email)==false) {
// e.preventDefault()
// UIkit.notification({
//   message: 'Por favor complete todos los campos',
//   status: 'warning',
//   pos: 'top-right',
//   timeout: 2000,
// })
// }
// else if (nombreDelUsuario=="") {
//   e.preventDefault()
//   UIkit.notification({
//     message: 'Por favor ingrese su nombre',
//     status: 'warning',
//     pos: 'top-right',
//     timeout: 2000,
//   })
// }
// else if (emailIsValid(email)==false) {
//   e.preventDefault()
//   UIkit.notification({
//     message: 'Por favor ingrese su email',
//     status: 'warning',
//     pos: 'top-right',
//     timeout: 2000,
//   })
// }
// else {
//   e.preventDefault()
//   sessionStorage.setItem('userName', nombreDelUsuario)
// }
//   }
//
//   // if (emailIsValid(email)==false) {
//   //   e.preventDefault()
//   //   alert("Ingresa un email valido")
//   // }
//   //
//   // else if (nombreDelUsuario == "") {
//   //   e.preventDefault()
//   //   alert("Ingrese su nombre")
//   // }
//   // else {
//   //   // window.reload()
//   //   localStorage.setItem("userName", nombreDelUsuario )
//   // }
//
//
//   var nombreDelUsuario = document.getElementById("Nombre").value
//   if (nombreDelUsuario == "") {
// document.querySelector('#bienvenida').style.display = "none"
// document.querySelector("#botonLogIn").style.display="block"
// document.querySelector('li.favoritos').style.display='none'
//
//   }
//   else {
//     document.querySelector('#bienvenida').innerHTML = "Bienvenido, " + sessionStorage.getItem('userName')
//     document.querySelector(".close").click()
//     document.querySelector("#botonLogIn").style.display="none"
//     document.querySelector('li.favoritos').style.display='block'
//     // localStorage.setItem("userName", nombreDelUsuario)
//
//   }

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
  // var nombreDelUsuario = document.getElementById("Nombre").value




// if (localStorage.getItem("userName") != null) {
// document.querySelector('#bienvenida').innerHTML = "Bienvenido, " + localStorage.getItem("userName")
// }
// else {
//
// }

// if (localStorage.getItem("userName") != null) {
//   document.querySelector('#bienvenida').innerHTML = "Bienvenido, " + localStorage.getItem("userName")
// }

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
}
