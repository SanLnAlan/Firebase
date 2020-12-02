// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDjdUAXqcb3tzL9OhsrvkECBnXdnaj_PgU",
  authDomain: "paginasweb-e28aa.firebaseapp.com",
  projectId: "paginasweb-e28aa"
});

var db = firebase.firestore();


let usuarios= [];

function actualizarDatos(){
	let i = 0;

	usuarios = [];
	db.collection("usuarios").onSnapshot((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			let datos = new Object();
			datos.id = doc.id;
			datos.data = doc.data();
			console.log(datos);
			usuarios.push(datos);
			i++;
			console.log("cantidad: " + i);
		});
		return usuarios;
	});
}
actualizarDatos();

// function enfocar(){
// 	document.getElementById("nombretxt").focus();
// }


// ------------------------VUE --------------------------------------
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
		enfocar(){
			this.showNuevo = false;
			this.$nextTick(() => this.$refs.nom.focus())
		},
		editar(id, nombre, apellido, fecha){
			console.log(id, nombre, apellido, fecha);
			// document.getElementById("e_nombre").placeholder = nombre;
			// document.getElementById("e_apellido").placeholder = apellido;
			// document.getElementById("e_fecha").placeholder = fecha;
		
			// document.getElementById("actualizar_boton").onclick = function(){
			// 	let nombre = document.getElementById("e_nombre").value;
			// 	let apellido = document.getElementById("e_apellido").value;
			// 	let fecha = document.getElementById("e_fecha").value;
		
			// 	if (nombre == '') {
			// 		nombre = document.getElementById("e_nombre").placeholder;
			// 	}
			// 	if (apellido == '') {
			// 		apellido = document.getElementById("e_apellido").placeholder;
			// 	}
			// 	if (fecha == '') {
			// 		fecha = document.getElementById("e_fecha").placeholder;
			// 	}
		
			// 	let actualizarInfo = db.collection("usuarios").doc(id);
		
			// 	return actualizarInfo.update({
			// 		nombre: nombre,
			// 		apellido: apellido,
			// 		fecha_nacimiento: fecha
			// 	})
			// 	.then(function() {
			// 			console.log("Document successfully updated!");
			// 			$('#Modal').modal('hide');
			// 			document.getElementById("e_nombre").value = '';
			// 			document.getElementById("e_apellido").value = '';
			// 			document.getElementById("e_fecha").value = '';
			// 	})
			// 	.catch(function(error) {
			// 			// The document probably doesn't exist.
			// 			console.error("Error updating document: ", error);
			// 	});
			// }
		},
		eliminar(id){
			usuarios = [];
			db.collection("usuarios").doc(id).delete().then(function() {
				console.log("Document successfully deleted!");
			}).catch(function(error) {
				console.error("Error removing document: ", error);
			});
			this.materias = usuarios;
		},
		guardar(){

			if(this.n_nombre == '' || this.n_apellido == '' || this.n_fecha == ''){
				alert("Favor de llenar todos los campos");
			}else{
				usuarios = [];
				db.collection("usuarios").add({
					nombre: this.n_nombre,
					apellido: this.n_apellido,
					fecha_nacimiento: this.n_fecha
			})
			.then(function(docRef) {
					console.log("Document written with ID: ", docRef.id);
					this.n_nombre = '';
					this.n_apellido = '';
					this.n_fecha = '';
					this.materias = usuarios;
			})
			.catch(function(error) {
					alert("Error agregado datos: ", error);
					console.error("Error adding document: ", error);
			});
				this.materias = usuarios;
				this.showNuevo = true;
				this.n_nombre = '';
				this.n_apellido = '';
				this.n_fecha = '';
				
			}
		},
	},
});
