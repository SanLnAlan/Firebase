// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDjdUAXqcb3tzL9OhsrvkECBnXdnaj_PgU",
  authDomain: "paginasweb-e28aa.firebaseapp.com",
  projectId: "paginasweb-e28aa"
});

var db = firebase.firestore();

let usuarios= [];
db.collection("usuarios").onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
			console.log(doc.data());
			usuarios.push(doc.data(), doc.id);
  });
});

console.log("usuarios: ");
console.log(usuarios);

const app = new Vue({
	el: '#app',
	data: {
		titulo: 'Hola mundo',
		titulo_tabla: 'Registro de materia prima',
		materias: usuarios		
	}
});
