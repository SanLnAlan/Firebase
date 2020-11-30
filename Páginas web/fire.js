var config = {
  apiKey: "AIzaSyDjdUAXqcb3tzL9OhsrvkECBnXdnaj_PgU",
  authDomain: "paginasweb-e28aa.firebaseapp.com",
  databaseURL: "https://paginasweb-e28aa.firebaseio.com",
  projectId: "paginasweb-e28aa",
  storageBucket: "paginasweb-e28aa.appspot.com",
  messagingSenderId: "252326353725",
  appId: "1:252326353725:web:4c951c66826bb4ac8a8354"
};
// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();
var mensajeRef = database.ref('Titulo');

var app = document.getElementById('encabezado');

// Obtención de datos
// método once
// mensajeRef.once('value').then(function(snap){
//   app.innerText = snap.val();
// });

// metodo on
mensajeRef.on('value', function(snapshot){
  updateStarCount(app, snapshot.val())
});

function nuevoRegistro(){
  let materia = document.getElementById('materia').value
  database.ref('material/' + materia).set({
    nombre: materia,
    caducidad: document.getElementById('caducidad').value
  });

}
