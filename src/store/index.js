import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import games from './modules/games'
import players from './modules/players'
import { CLEAR_ERROR, SET_ERROR, SET_LOADING } from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: null
  },
  mutations: {
    [SET_LOADING](state, payload){
      state.loading = payload
    },
    [SET_ERROR](state, payload){
      state.error = payload
    },
    [CLEAR_ERROR](state){
      state.error = null
    },
  },
  actions: {
  },
  modules: {
    auth,
    games,
    players
  }
})
