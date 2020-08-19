import firebase from 'firebase/app'
import { db } from '@/firebase/firebaseInit'
import { uploadImage } from './util/helper'
import {
  CREATE_GAME,
  CANCEL_GAME,
  CLEAR_ERROR, CLEAR_GAMES,
  JOIN_GAME,
  SET_ERROR,
  SET_GAMES,
  SET_LOADING,
  QUIT_GAME,
  UPDATE_GAME, UPDATE_GAME_IMAGE
} from '../types'


export default {
  state: {
    games: [],
    filter: 'all'
  },
  mutations: {
    SET_GAME_FILTER (state, payload) {
      state.filter = payload
    },
    [SET_GAMES] (state, payload) {
      state.games = payload
    },
    [CREATE_GAME] (state, payload) {
      state.games.push(payload)
    },
    [UPDATE_GAME] (state, payload) {
      const games = [...state.games]
      const indx = games.findIndex(g => g.id === payload.id)
      if (indx >= 0) games[indx] = payload
      state.games = games
    },
    [UPDATE_GAME_IMAGE] (state, { gameId, url }) {
      const games = [...state.games]
      const indx = games.findIndex(g => g.id === gameId)
      if (indx >= 0) {
        games[indx].imgUrl = url
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
    [QUIT_GAME] (state, { uid, gameId }) {
      const games = [...state.games]
      const index = games.findIndex(g => g.id === gameId)
      if (index >= 0) {
        games[index].roaster = games[index].roaster.filter(id => id !== uid)
      }
      state.games = games
    },
    [JOIN_GAME] (state, { uid, gameId }) {
      const games = [...state.games]
      const index = games.findIndex(g => g.id === gameId)
      if (index >= 0) games[index].roaster.push(uid)
      state.games = games
    },
    [CLEAR_GAMES] (state) {
      state.games = []
    }
  },
  actions: {
    async createGame ({ commit, dispatch }, { image, ...rest }) {
      const gamesRef = db.collection('games')
      const uid = await dispatch('getUid')
      const gameData = {
        creatorId: uid,
        roaster: [],
        createdAt: Date.now(),
        ...rest
      }
      const res = await gamesRef.add(gameData)
      const url = await uploadImage(image, 'games', res.id)
      await gamesRef.doc(res.id).update({ imgUrl: url })
      gameData.id = res.id
      gameData.imgUrl = url
      commit(CREATE_GAME, gameData)
    },
    async fetchGames ({ commit }) {
      const games = []
      const gamesRef = db.collection('games')
      const rowGames = await gamesRef.get()
      rowGames.forEach(snap => {
        games.push({ id: snap.id, ...snap.data() })
      })
      commit(SET_GAMES, games)
    },
    async join ({ commit, dispatch }, gameId) {
      const uid = await dispatch('getUid')
      const playerRef = db.collection('players').doc(uid)
      const gameRef = db.collection('games').doc(gameId)
      await playerRef.update({ games: firebase.firestore.FieldValue.arrayUnion(gameId) })
      await gameRef.update({ roaster: firebase.firestore.FieldValue.arrayUnion(uid) })
      commit('USER_JOIN_GAME', gameId)
      commit(JOIN_GAME, { uid, gameId })
    },
    async quit ({ commit, dispatch }, gameId) {
      const uid = await dispatch('getUid')
      const playerRef = db.collection('players').doc(uid)
      const gameRef = db.collection('games').doc(gameId)
      await playerRef.update({ games: firebase.firestore.FieldValue.arrayRemove(gameId) })
      await gameRef.update({ roaster: firebase.firestore.FieldValue.arrayRemove(uid) })
      commit('USER_QUIT_GAME', gameId)
      commit(QUIT_GAME, { uid, gameId })
    },
    async updateGame ({ commit }, { id, ...rest }) {
      await db.collection('games').doc(id).update({ ...rest })
      commit(UPDATE_GAME, { id, ...rest })
    },
    async updateGameImage ({ commit }, { gameId, image }) {
      const url = await uploadImage(image, 'games', gameId)
      const gameRef = db.collection('games').doc(gameId)
      await gameRef.update({ imgUrl: url })
      commit(UPDATE_GAME_IMAGE, { gameId, url })
    }
  },
  getters: {
    games (state) {
      return state.games
    },
    scheduledGames (state) {
      return state.games.filter(g => g.status === 'scheduled')
    },
    gameById: (state) => (id) => {
      return state.games.find(g => g.id === id)
    }
  }
}
