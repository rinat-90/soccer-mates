import { SET_USER } from '../types'
export default {
  state:{
    user: null,
  },
  mutations:{
    [SET_USER](state, user){
      state.user = user
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
