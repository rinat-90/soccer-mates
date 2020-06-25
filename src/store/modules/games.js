import {SET_GAMES} from "../types";


export default {
  state:{
    games: [],
  },
  mutations:{
    [SET_GAMES](state, games){
      state.user = games
    }
  },
  actions:{

  },
  getters:{
    games(state){
      return state.games
    }
  }
}
