import firebase from 'firebase/app'
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
        const res = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val() || {}
        const info = { ...res, userId: uid }
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
        if (getters.info.email !== userData.email) {
          await dispatch('updateEmail', userData.email)
        }
        await firebase.database().ref(`/users/${uid}/info`).update(userData)
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
        const filename = payload.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        const file = await firebase.storage().ref(`/users/${uid}${ext}`).put(payload)
        const url = await file.ref.getDownloadURL()
        await firebase.database().ref('/users').child(`${uid}/info`).update({ imgUrl: url })
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
    }
  }
}
