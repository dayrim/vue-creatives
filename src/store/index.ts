import Vue from "vue";
import Vuex from "vuex";
import { Creatives } from "@/store/modules/creatives/interfaces";
import { Firestore } from "@/store/modules/firestore/interfaces";

Vue.use(Vuex);

export interface State {
  creatives: Creatives;
  firestore: Firestore;
}

export default new Vuex.Store<State>({});
