import { db } from '@/firebase/firebaseInit'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD')
console.log(date)
export default {
  state: {
    games: []
  },
  mutations: vuexfireMutations,
  actions: {
    bindGames: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('games', db.collection('games')
        .orderBy('date', 'asc')
        .where('date', '>=', date)
        .orderBy('startTime', 'asc'))
    }),
    unbindGames: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('games')
    })
  },
  getters: {
    games (state) {
      return state.games
    }
  }
}
