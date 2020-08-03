import firebase from 'firebase/app'
import {CLEAR_ERROR, SET_ERROR, SET_LOADING, CLEAR_INFO, CLEAR_GAMES, CLEAR_PLAYERS} from '../types'
export default {
  actions: {
    async register ({ commit, dispatch }, { email, password, displayName }) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        // await firebase.database().ref(`/users/${uid}/info`).set({
        //   email,
        //   displayName,
        //   imgUrl: ''
        // })
        await firebase.firestore().collection('players').doc(uid).set({
          email,
          displayName,
          imgUrl: ''
        })
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    },
    async signIn ({ commit, dispatch }, { email, password }) {
      try {
        commit(CLEAR_ERROR)
        commit(SET_LOADING, true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit(SET_LOADING, false)
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    },
    async signOut ({ commit, dispatch }) {
      await firebase.auth().signOut()
      commit(CLEAR_INFO)
      dispatch('unbindGames')
      // commit(CLEAR_GAMES)
      commit(CLEAR_PLAYERS)
    },
    async updateEmail ({ commit }, email) {
      try {
        const user = firebase.auth().currentUser
        if (user) {
          await user.updateEmail(email)
        }
      } catch (error) {
        commit(SET_LOADING, false)
        commit(SET_ERROR, error)
        throw error
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
