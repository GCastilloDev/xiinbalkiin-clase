import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    estaciones: [],
    pintaMarcadores: false,
  },
  mutations: {
    SET_ESTACIONES(state, payload) {
      state.estaciones.push(payload);
    },
    SHOW_MARKERS(state) {
      state.pintaMarcadores = true;
    },
  },
  actions: {
    agregarEstacion({ commit }, payload) {
      commit('SET_ESTACIONES', payload);
    },
    pintaLosMarcadores({ commit }) {
      commit('SHOW_MARKERS');
    },
  },
  modules: {},
});
