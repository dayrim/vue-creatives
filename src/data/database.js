import firebase from "firebase";

let config = {
  apiKey: "AIzaSyBQiU4Q5wLY6koBynHvMYJgoZHn_kZRZsk",
  authDomain: "vue-creative.firebaseapp.com",
  databaseURL: "https://vue-creative.firebaseio.com",
  projectId: "vue-creative",
  storageBucket: "vue-creative.appspot.com",
  messagingSenderId: "144265649038",
};

console.log("database imported");
let app = firebase.initializeApp(config);

let database = app.firestore();

export default database;
