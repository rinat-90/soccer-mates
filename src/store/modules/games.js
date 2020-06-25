import {SET_GAMES} from "../types";


export default {
  state:{
    games: [],
  },
  mutations:{
    [SET_GAMES](state, payload){
      state.games = payload
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
