import { db, storage } from '../../firebase/firebaseInit'
import { uploadImage } from "./util/uploadImage";
import { CLEAR_ERROR, CLEAR_INFO, SET_ERROR, SET_INFO, SET_LOADING, UPLOAD_INFO_PHOTO } from '../types'
export default {
  state: {
    info: {},
    info1: {}
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
        // const res = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val() || {}
        const res = ((await db.collection('players').doc(uid).get()).data())
        await dispatch('fetchPlayers')
        const info = { ...res, userId: uid }
        // console.log(info)
        commit(SET_INFO, info)
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
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
        commit(SET_INFO, userData)
      } catch (error) {
        commit(SET_ERROR, error)
        throw error
      }
    },
    async uploadUserPhoto ({ commit, dispatch }, payload) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        const uid = await dispatch('getUid')
        const playerRef = db.collection('players').doc(uid)
        const url = await uploadImage(payload, 'players', uid)
        await playerRef.update({ imgUrl: url })
        await dispatch('fetchPlayers')
        commit(UPLOAD_INFO_PHOTO, url)
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    }
  },
  getters: {
    info (state) {
      return state.info
    },
    info1 (state) {
      return state.info1
    }
  }
}
