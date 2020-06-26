import firebase from 'firebase/app';
export default {
  state:{
    info: {},
  },
  mutations:{
    SET_INFO(state, info){
      state.info = info
    },
    CLEAR_INFO(state){
      state.info = {};
    }
  },
  actions:{
    async fetchInfo({ commit, dispatch }){
      try {
        const uid = await dispatch('getUid');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('SET_INFO', info)
      }catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    },
    async updateInfo({ commit, dispatch, getters }, toUpdate){
      try {
        const uid = await dispatch('getUid');
        const updateData = { ...getters.info, ...toUpdate };
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);
        commit('SET_INFO', updateData)
      }catch (error) {
        commit('SET_ERROR', error)
        throw error
      }
    }
  },
  getters:{
    info(state){
      return state.info
    }
  }
}
