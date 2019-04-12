import Vue from "vue";
import Vuex from "vuex";
import { ADD_CREATIVE, TOGGLE_ADD_MODE, REMOVE_CREATIVE } from "./constants";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    creatives: [],
    addMode: false,
  },
  mutations: {
    [ADD_CREATIVE](state, payload) {
      state.creatives.push(Object.assign({}, payload));
    },
    [TOGGLE_ADD_MODE](state) {
      if (!state.addMode) {
        state.addMode = true;
      } else {
        state.addMode = false;
      }
    },
    [REMOVE_CREATIVE](state, payload) {
      state.creatives = state.creatives.filter(creative => creative.id !== payload);
    },
  },
  actions: {
    [ADD_CREATIVE]({ commit }, payload) {
      commit(ADD_CREATIVE, payload);
    },
    [TOGGLE_ADD_MODE]({ commit }, payload) {
      commit(TOGGLE_ADD_MODE, payload);
    },
    [REMOVE_CREATIVE]({ commit }, payload) {
      commit(REMOVE_CREATIVE, payload);
    },
  },
});
