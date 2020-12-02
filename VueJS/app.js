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
	let datos = new Object();
	datos.id = doc.id;
	datos.data = doc.data();
	console.log(datos);
	usuarios.push(datos);
  });
});


const app = new Vue({
	el: '#app',
	data: {
		titulo: 'Hola mundo',
		titulo_tabla: 'Registro de materia prima',
		materias: usuarios,
		n_nombre: '',		
		n_apellido: '',		
		n_fecha: '',
		showNuevo: true,
	},
	methods: {
		eliminar(id){
			alert(id);
			db.collection("usuarios").doc(id).delete().then(function() {
				console.log("Document successfully deleted!");
			}).catch(function(error) {
				console.error("Error removing document: ", error);
			});
		},
		guardar(){

			if(this.n_nombre == '' || this.n_apellido == '' || this.n_fecha == ''){
				alert("Favor de llenar todos los campos");
			}else{
				db.collection("usuarios").add({
					nombre: this.n_nombre,
					apellido: this.n_apellido,
					fecha_nacimiento: this.n_fecha
			})
			.then(function(docRef) {
					console.log("Document written with ID: ", docRef.id);
					this.n_nombre = "";
					this.n_apellido = "";
					this.n_fecha= "";
			})
			.catch(function(error) {
					console.error("Error adding document: ", error);
			});
			}
		},
	},
});
