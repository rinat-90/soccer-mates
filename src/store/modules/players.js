import {SET_PLAYERS} from "../types";

export default {
  state:{
    players: [],
  },
  mutations:{
    [SET_PLAYERS](state, payload){
      state.players = payload
    }
  },
  actions:{

  },
  getters:{
    players(state){
      return state.players
    }
  }
}
