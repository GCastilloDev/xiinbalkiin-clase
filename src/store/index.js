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
    ELIMINAR_ESTACION(state, index) {
      state.estaciones.splice(index, 1);
    },
  },
  actions: {
    agregarEstacion({ commit }, payload) {
      commit('SET_ESTACIONES', payload);
    },
    pintaLosMarcadores({ commit }) {
      commit('SHOW_MARKERS');
    },
    eliminarEstacionStorage({ commit }, index) {
      commit('ELIMINAR_ESTACION', index);
    },
  },
  modules: {},
});
