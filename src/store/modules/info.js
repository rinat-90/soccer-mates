import { db } from '@/firebase/firebaseInit'
import { uploadImage } from './util/helper'
import { CLEAR_ERROR, CLEAR_INFO, SET_ERROR, SET_INFO, SET_LOADING, UPLOAD_INFO_PHOTO } from '../types'
export default {
  state: {
    info: {}
  },
  mutations: {
    [SET_INFO] (state, info) {
      state.info = info
    },
    [CLEAR_INFO] (state) {
      state.info = {}
    },
    [UPLOAD_INFO_PHOTO] (state, payload) {
      state.info.imgUrl = payload
    }
  },
  actions: {
    async fetchInfo ({ commit, dispatch }) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        const uid = await dispatch('getUid')
        const user = ((await db.collection('players').doc(uid).get()).data())
        const info = { ...user, userId: uid }
        commit(SET_INFO, info)
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    },
    async fetchUserGames ({ commit, dispatch, getters }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const games = []
        const gamesRef = db.collection('games')
        const res = await gamesRef.where('id', 'in', [...getters.info.games]).get()
        console.log(res.docs)
        res.docs.forEach(snap => {
          games.push(snap.data())
        })
        commit('SET_USER_GAMES', games)
      } catch (error) {
        throw error
      }
    },
    async updateUserInfo ({ commit, dispatch, getters }, userData) {
      try {
        const uid = await dispatch('getUid')
        const playerRef = db.collection('players').doc(uid)
        if (getters.info.email !== userData.email) {
          await dispatch('updateEmail', userData.email)
        }
        await playerRef.update(userData)
        await dispatch('fetchPlayers')
        commit(SET_INFO, userData)
      } catch (error) {
        commit(SET_ERROR, error)
        throw error
      }
    },
    async uploadUserPhoto ({ commit, dispatch }, payload) {
      // eslint-disable-next-line no-useless-catch
      try {
        const uid = await dispatch('getUid')
        const playerRef = db.collection('players').doc(uid)
        const url = await uploadImage(payload, 'players', uid)
        await playerRef.update({ imgUrl: url })
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    info (state) {
      return state.info
    },
    userGames (state) {
      return state.info.games
    }
  }
}
