import Vue from "vue";
import Vuex from "vuex";
import database from "./database";
import { ADD_CREATIVE, TOGGLE_ADD_MODE, REMOVE_CREATIVE, MODIFY_CREATIVE } from "./constants";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    creatives: [],
    addMode: false,
    database: database,
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
    [MODIFY_CREATIVE](state, payload) {
      let oldIndex = state.creatives.findIndex(creative => creative.id === payload.id);
      state.creatives.splice(oldIndex, 1, Object.assign({}, payload));
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
    [MODIFY_CREATIVE]({ commit }, payload) {
      commit(MODIFY_CREATIVE, payload);
    },
  },
});
