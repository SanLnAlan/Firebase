// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDjdUAXqcb3tzL9OhsrvkECBnXdnaj_PgU",
  authDomain: "paginasweb-e28aa.firebaseapp.com",
  projectId: "paginasweb-e28aa"
});

var db = firebase.firestore();

// Agregando datos
function guardar(){
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let fecha = document.getElementById("fecha").value;
  db.collection("usuarios").add({
      nombre: nombre,
      apellido: apellido,
      fecha_nacimiento: fecha
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("fecha").value = "";
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

//Obteniendo datos
let tabla = document.getElementById("tabla");
let contador;
db.collection("usuarios").onSnapshot((querySnapshot) => {
  tabla.innerHTML = "";
  contador = 0;
  querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().nombre}`);
      contador += 1;
      tabla.innerHTML += `
        <tr>
          <th scope="row">${contador}</th>
          <td>${doc.data().nombre}</td>
          <td>${doc.data().apellido}</td>
          <td>${doc.data().fecha_nacimiento}</td>
          <td><button onclick="eliminar('${doc.id}')" class="btn btn-sm btn-danger"><i class="fa fa-times-circle"></i></button></td>
          <td><button onclick="editar('${doc.id}', '${doc.data().nombre}', '${doc.data().apellido}', '${doc.data().fecha_nacimiento}')" data-toggle="modal" data-target="#Modal" class="btn btn-sm btn-warning"><i class="fa fa-pencil text-light"></i></button></td>
        </tr>
      `
  });
});

// borrar datos
function eliminar(id){
  db.collection("usuarios").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}

// Editar datos
function editar(id, nombre, apellido, fecha){
  document.getElementById("e_nombre").placeholder = nombre;
  document.getElementById("e_apellido").placeholder = apellido;
  document.getElementById("e_fecha").placeholder = fecha;

  document.getElementById("actualizar_boton").onclick = function(){
    let nombre = document.getElementById("e_nombre").value;
    let apellido = document.getElementById("e_apellido").value;
    let fecha = document.getElementById("e_fecha").value;

    if (nombre == '') {
      nombre = document.getElementById("e_nombre").placeholder;
    }
    if (apellido == '') {
      apellido = document.getElementById("e_apellido").placeholder;
    }
    if (fecha == '') {
      fecha = document.getElementById("e_fecha").placeholder;
    }

    let actualizarInfo = db.collection("usuarios").doc(id);

    return actualizarInfo.update({
      nombre: nombre,
      apellido: apellido,
      fecha_nacimiento: fecha
    })
    .then(function() {
        console.log("Document successfully updated!");
        $('#Modal').modal('hide');
        document.getElementById("e_nombre").value = '';
        document.getElementById("e_apellido").value = '';
        document.getElementById("e_fecha").value = '';
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
}
