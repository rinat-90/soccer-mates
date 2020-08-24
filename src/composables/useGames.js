import { reactive, toRefs} from '@vue/composition-api'
import { db } from '@/firebase/firebaseInit'
import store from '../store'
export default function useGames () {
  const state = reactive({
    games: [],
    game: {}
  })

  const getGames = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const games = []
      const gamesRef = db.collection('games')
      const rowGames = await gamesRef.where('date', '>=', '2020-08-21').get()
      rowGames.forEach(snap => {
        games.push({ id: snap.id, ...snap.data() })
      })
      state.games = games
    } catch (error) {
      throw error
    }
  }
  const getGameById = async id => {
    // eslint-disable-next-line no-useless-catch
    try {
      state.game = ((await db.collection('games').doc(id).get()).data())
    } catch (error) {
      throw error
    }
  }

  const getPlayerGames = async id => {
    // eslint-disable-next-line no-useless-catch
    try {
      state.game = ((await db.collection('games').doc(id).get()).data())
    } catch (error) {
      throw error
    }
  }

  return {
    ...toRefs(state),
    getGames,
    getGameById
  }

}
