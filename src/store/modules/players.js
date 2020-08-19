import { CLEAR_ERROR, CLEAR_PLAYERS, SET_ERROR, SET_LOADING, SET_PLAYERS } from '../types'
import { db } from '../../firebase/firebaseInit'
export default {
  state: {
    players: [],
  },
  mutations: {
    [SET_PLAYERS] (state, payload) {
      state.players = payload
    },
    [CLEAR_PLAYERS] (state) {
      state.players = []
    },
    UPDATE_PLAYER (state, player) {
      const players = [...state.players]
      const index = players.findIndex(p => p.userId === player.userId)
      if (index >= 0) {
        players[index] = player
      }
      state.players = players
    }
  },
  actions: {
    async fetchPlayers ({ commit }) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        const players = []
        const playersRef = db.collection('players')
        const rowPlayers = await playersRef.get()
        rowPlayers.forEach(snap => {
          const data = {
            id: snap.id,
            ...snap.data()
          }
          players.push(data)
        })
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
