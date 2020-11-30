var config = {
    apiKey: "AIzaSyCfgT9eCcC1wLVSCZAMjtsIVlV4EKbL4WE",
    authDomain: "pruebas-18649.firebaseapp.com",
    databaseURL: "https://pruebas-18649.firebaseio.com",
    projectId: "pruebas-18649",
    storageBucket: "pruebas-18649.appspot.com",
    messagingSenderId: "742626874887",
    appId: "1:742626874887:web:94bc1a052162c7e7127ca2",
    measurementId: "G-H3QBPLBSH7"
  };
  firebase.initializeApp(config);

const dbref=firebase.database().ref().child('usuarios');

dbref.on('value',function(snapshot){

    snapshot.forEach(function(childSnapshot) {

        console.log(childSnapshot.key)

        console.log(childSnapshot.val())
    })

})
