import firebase from 'firebase/app'
import {
  ADD_GAME,
  CANCEL_GAME,
  CLEAR_ERROR, CLEAR_GAMES,
  JOIN_GAME,
  SET_ERROR,
  SET_GAMES,
  SET_LOADING,
  UNJOIN_GAME,
  UPDATE_GAME
} from '../types'
export default {
  state: {
    games: []
  },
  mutations: {
    [SET_GAMES] (state, payload) {
      state.games = payload
    },
    [ADD_GAME] (state, payload) {
      state.games.push(payload)
    },
    [UPDATE_GAME] (state, payload) {
      const games = [...state.games]
      const indx = games.findIndex(g => g.id === payload.id)
      if (indx >= 0) {
        games[indx].status = payload.status
      }
      state.games = games
    },
    [CANCEL_GAME] (state, id) {
      const games = [...state.games]
      const indx = games.findIndex(g => g.id === id)
      if (indx >= 0) {
        games[indx].status = 'canceled'
      }
      state.games = games
    },
    [UNJOIN_GAME] (state, { key, gameId }) {
      const games = [...state.games]
      const index = games.findIndex(g => g.id === gameId)
      if (index >= 0) {
        for (const k in games[index].going) {
          if (k === key) {
            delete games[index].going[k]
          }
        }
      }
      state.games = games
    },
    [JOIN_GAME] (state, { id, uid, key }) {
      const games = [...state.games]
      const index = games.findIndex(g => g.id === id)
      if (index >= 0) {
        games[index].going[key] = uid
      }
      state.games = games
    },
    [CLEAR_GAMES] (state) {
      state.games = []
    }
  },
  actions: {
    async createGame ({ commit, dispatch }, game) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        const uid = await dispatch('getUid')
        const gameData = {
          creatorId: uid,
          createdDate: Date.now(),
          going: [],
          status: 'scheduled',
          ...game
        }
        const res = await firebase.database()
          .ref('/games')
          .push(gameData)

        const filename = game.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        const file = await firebase.storage().ref(`/games/${res.key}${ext}`).put(game.image)
        const url = await file.ref.getDownloadURL()
        await firebase.database().ref('/games').child(res.key).update({ imgUrl: url })

        commit(ADD_GAME, { gameData })
        commit(SET_LOADING, false)
        return res.key
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    },
    async fetchGames ({ commit }) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        const rowGames = (await firebase.database().ref('/games').once('value')).val() || {}
        const games = Object.keys(rowGames).map(key => {
          // console.log(rowGames[key]);
          // console.log(rowGames[key].going);
          if (rowGames[key].going) {
            /// rowGames[key]['going'] = Object.values(rowGames[key]['going']);
            return { ...rowGames[key], id: key }
          } else {
            return { ...rowGames[key], id: key, going: [] }
          }
        })
        commit(SET_GAMES, games)
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    },
    async join ({ commit, dispatch }, id) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        const uid = await dispatch('getUid')
        const res = await firebase.database().ref(`/games/${id}/going`).push(uid)
        commit(JOIN_GAME, { id, uid, key: res.key })
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    },
    async unjoin ({ commit, dispatch }, { gameId, key }) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        await firebase.database().ref('/games').child(gameId).child('going').child(key).remove()
        commit(UNJOIN_GAME, { key, gameId })
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    },
    async updateGame ({ commit }, game) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        await firebase.database().ref('/games').child(game.id).update(game)
        commit(UPDATE_GAME, game)
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    },
    async cancelGame ({ commit }, id) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        await firebase.database().ref('/games').child(id).update({ status: 'canceled' })
        commit(CANCEL_GAME, id)
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    }
  },
  getters: {
    games (state) {
      return state.games
    },
    gameById: (state) => (id) => {
      return state.games.find(g => g.id === id)
    }
  }
}
