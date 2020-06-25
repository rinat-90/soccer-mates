import { SET_USER } from '../types'
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

  },
  getters:{
    user(state){
      return state.user
    }
  }
}
