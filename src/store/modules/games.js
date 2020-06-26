import {SET_GAMES} from "../types";


export default {
  state:{
    games: [
      { id: 1, title: 'Monday Pickup Game', skill: 'All Skill Level', date:'06/03, 12pm', spots: 12 },
      { id: 2, title: 'Friday Pickup Game', skill: 'All Skill Level', date:'06/03, 12pm', spots: 12 },
      { id: 3, title: 'Synday Pickup Game', skill: 'All Skill Level', date:'06/03, 12pm', spots: 12 },
    ],
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
