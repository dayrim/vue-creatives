import { Module, VuexModule, getModule } from "vuex-module-decorators";
import store from "@/store";
import { Firestore } from "./interfaces";
import * as firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyBQiU4Q5wLY6koBynHvMYJgoZHn_kZRZsk",
  authDomain: "vue-creative.firebaseapp.com",
  databaseURL: "https://vue-creative.firebaseio.com",
  projectId: "vue-creative",
  storageBucket: "vue-creative.appspot.com",
  messagingSenderId: "144265649038",
};

let database: import("firebase").firestore.Firestore = firebase.initializeApp(config).firestore();

@Module({
  dynamic: true,
  namespaced: true,
  name: "firestore",
  store,
})
class FirestoreModule extends VuexModule implements Firestore {
  public firestore: import("firebase").firestore.Firestore = database;
}

export default getModule(FirestoreModule);
