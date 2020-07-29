import { CLEAR_ERROR, CLEAR_PLAYERS, SET_ERROR, SET_LOADING, SET_PLAYERS } from '../types'
import firebase from 'firebase'

export default {
  state: {
    players: []
  },
  mutations: {
    [SET_PLAYERS] (state, payload) {
      state.players = payload
    },
    [CLEAR_PLAYERS] (state) {
      state.players = []
    }
  },
  actions: {
    async fetchPlayers ({ commit }) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        const rowPlayers = (await firebase.database().ref('/users').once('value')).val() || {}
        const players = Object.keys(rowPlayers).map(key => ({ ...rowPlayers[key].info, id: key }))
        commit(SET_PLAYERS, players)
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    }

  },
  getters: {
    players (state) {
      return state.players
    },
    playerById: (state) => (id) => {
      return state.players.find(p => p.id === id)
    }
  }
}
