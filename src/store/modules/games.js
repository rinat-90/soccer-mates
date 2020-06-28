import firebase from 'firebase/app';
import {ADD_GAME, CLEAR_ERROR, SET_ERROR, SET_GAMES, SET_LOADING} from "../types";
export default {
  state:{
    games: [],
  },
  mutations:{
    [SET_GAMES](state, payload){
      state.games = payload
    },
    [ADD_GAME](state, payload){
      state.games.push(payload)
    },
    GET_SPOT(state, {id, uid }){
      const games = [...state.games];
      const index = games.findIndex(g => g.id === id);
      if(index >= 0){
        games[index].going.push(uid)
      }
      state.games = games;

    }
  },
  actions:{
    async createGame({ commit, dispatch }, game){
      try {
        commit(CLEAR_ERROR);
        commit(SET_LOADING, true);
        const uid = await dispatch('getUid');
        const gameData = {
          creatorId: uid,
          createdDate: Date.now(),
          going: [],
          status: 'scheduled',
          ...game
        };
        const res = await firebase.database()
          .ref(`/games`)
          .push(gameData);
        commit(ADD_GAME, {gameData});
        commit(SET_LOADING, false);
        return res.key
      }catch (error) {
        commit(SET_LOADING, false);
        commit(SET_ERROR, error);
        throw error
      }
    },
    async fetchGames({ commit }){
      try {
        commit(CLEAR_ERROR);
        commit(SET_LOADING, true);
        const rowGames = (await firebase.database().ref(`/games`).once('value') ).val() || {};
        const games = Object.keys(rowGames).map(key => {
          console.log(rowGames[key]['going']);
          if(rowGames[key]['going']){
            rowGames[key]['going'] = Object.values(rowGames[key]['going']);
           return  { ...rowGames[key], id: key }
          }else{
            return  { ...rowGames[key], id: key, going: [] }
          }
        });
        commit(SET_GAMES, games);
        commit(SET_LOADING, false);
      }catch (error) {
        commit(SET_LOADING, false);
        commit(SET_ERROR, error);
        throw error
      }
    },
    async getSpot({ commit, dispatch }, id){
      try {
        commit(CLEAR_ERROR);
        commit(SET_LOADING, true);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/games/${id}/going`).push(uid);
        commit('GET_SPOT',{ id, uid });
        commit(SET_LOADING, false);
      }catch (error) {
        commit(SET_LOADING, false);
        commit(SET_ERROR, error);
        throw error
      }
    },
    async updateGame ({ commit, dispatch }, game ){
      try {
        commit(CLEAR_ERROR);
        commit(SET_LOADING, true);
        const uid = await dispatch('getUid');
        const updated = await firebase.database().ref(`/games`).child(game.id).update(game);
        console.log(updated);

        commit(SET_LOADING, false);
      }catch (error) {
        commit(SET_LOADING, false);
        commit(SET_ERROR, error);
        throw error
      }
    },
  },
  getters:{
    games(state){
      return state.games
    },
    gameById: (state) => (id) => {
      return state.games.find(g => g.id === id)
    }
  }
}
