import {SET_PLAYERS} from "../types";

export default {
  state:{
    players: [],
  },
  mutations:{
    [SET_PLAYERS](state, games){
      state.user = games
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
