import { db, auth } from '@/firebase/firebaseInit'

export default {
  actions: {
    async fetchPlayers () {
      // eslint-disable-next-line no-useless-catch
      try {
        const players = []
        const playersRef = db.collection('players')
        const rowPlayers = await playersRef.get()
        rowPlayers.forEach(snap => {
          players.push({ id: snap.id, ...snap.data() })
        })
        return players
      } catch (error) {
        throw error
      }
    },
    async fetchPlayerById (context, id) {
      // eslint-disable-next-line no-useless-catch
      try {
        const player = ((await db.collection('players').doc(id).get()).data())
        console.log(player)
        if (player.games && player.games.length) {
          for (let i = 0; i < player.games.length; i++) {
            player.games[i] = ((await player.games[i].get()).data())
            player.games[i].creator = ((await player.games[i].creator.get()).data())
          }
        }
        return player
      } catch (error) {
        throw error
      }
    },
    async updateUserInfo ({ dispatch }, userData) {
      try {
        const uid = await dispatch('getUid')
        console.log(auth.currentUser.email)
        const playerRef = db.collection('players').doc(uid)
        if (auth.currentUser.email !== userData.email) {
          await dispatch('updateEmail', userData.email)
        }
        await playerRef.update(userData)
      } catch (error) {
        throw error
      }
    },
    async fetchPlayerName (c, payload) {
      // eslint-disable-next-line no-useless-catch
      try {
        const players = []
        const playersRef = db.collection('players')
        const rowPlayers = await playersRef.where('displayName', '<=', payload).get()
        rowPlayers.forEach(snap => {
          players.push({ id: snap.id, ...snap.data() })
        })
        return players
      } catch (error) {
        throw error
      }
    }
  }
}
