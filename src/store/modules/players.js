import { CLEAR_ERROR, CLEAR_PLAYERS, SET_ERROR, SET_LOADING, SET_PLAYERS } from '../types'
import { firestoreAction } from 'vuexfire'
import { db } from '../../firebase/firebaseInit'
export default {
  state: {
    players: [],
    player: null
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
    bindPlayers: firestoreAction(async ({ bindFirestoreRef }) => {
      return await bindFirestoreRef('players', db.collection('players'))
    }),
    bindPlayer: firestoreAction(async (context, { bindFirestoreRef }) => {
      const uid = await context.dispatch('getUid')
      return await bindFirestoreRef('player', db.collection('players').doc(uid))
    }),
    async fetchPlayers ({ commit }) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        const rowPlayers = await db.collection('players').get()
        const players = await rowPlayers.docs.map(doc => ({ ...doc.data(), id: doc.id }))
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
