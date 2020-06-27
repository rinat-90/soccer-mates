import firebase from 'firebase/app';
import {CLEAR_ERROR, SET_ERROR, SET_LOADING, SET_USER} from '../types'
export default {
  state:{
    user: null,
  },
  mutations:{
    [SET_USER](state, payload){
      state.user = payload
    }
  },
  actions:{
    async register({ commit, dispatch }, { email, password, displayName }){
      try{
        commit(CLEAR_ERROR);
        commit(SET_LOADING, true);
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          email,
          displayName
        });
        commit(SET_LOADING, false);
      }catch (error) {
        commit(SET_LOADING, false);
        commit(SET_ERROR, error);
        throw error
      }

    },
    async signIn({ commit, dispatch }, { email, password }){
      try{
        commit(CLEAR_ERROR);
        commit(SET_LOADING, true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit(SET_LOADING, false);
      }catch (error) {
        commit(SET_LOADING, false);
        commit(SET_ERROR, error);
        throw error
      }
    },
    async signOut({ commit }){
      await firebase.auth().signOut();
    },
    getUid(){
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    }
  }
}
