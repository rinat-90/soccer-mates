import firebase from 'firebase/app'
import { db } from '../../firebase/firebaseInit'
import { firestoreAction } from 'vuexfire'
import { uploadImage } from './util/uploadImage'

export default {
  state: {
    games: []
  },
  mutations: {
  },
  actions: {
    bindGames: firestoreAction(async ({ bindFirestoreRef }) => {
      return await bindFirestoreRef('games', db.collection('games'))
    }),
    unbindGames: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('games')
    }),
    createGame: firestoreAction(async (context, payload) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const { image, ...rest } = payload
        const uid = await context.dispatch('getUid')
        const creatorRef = db.collection('players').doc(uid)
        const gamesRef = db.collection('games')
        const gameData = {
          createdDate: Date.now(),
          going: [],
          status: 'scheduled',
          creator: creatorRef,
          ...rest
        }
        const res = await gamesRef.add(gameData)
        const gameRef = gamesRef.doc(res.id)
        await creatorRef.update({
          games: firebase.firestore.FieldValue.arrayUnion(gameRef)
        })
        const url = await uploadImage(image, 'games', res.id)
        await gameRef.update({ imgUrl: url })
        return res.id
      } catch (e) {
        throw e
      }
    }),
    updateGame: firestoreAction(async (context, { id, ...rest }) => {
      // eslint-disable-next-line no-useless-catch
      try {
        return await db.collection('games').doc(id).update({ ...rest })
      } catch (e) {
        throw e
      }
    }),
    join: firestoreAction(async (context, payload) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const uid = await context.dispatch('getUid')
        const playerRef = db.collection('players').doc(uid)
        const gameRef = db.collection('games').doc(payload)
        await playerRef.update({
          games: firebase.firestore.FieldValue.arrayUnion(gameRef)
        })
        return await gameRef
          .update({
            going: firebase.firestore.FieldValue.arrayUnion(playerRef)
          })
      } catch (e) {
        throw e
      }
    }),
    quit: firestoreAction(async (context, payload) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const uid = await context.dispatch('getUid')
        const playerRef = db.collection('players').doc(uid)
        const gameRef = db.collection('games').doc(payload)
        await playerRef.update({
          games: firebase.firestore.FieldValue.arrayRemove(gameRef)
        })
        return await gameRef.update({
          going: firebase.firestore.FieldValue.arrayRemove(playerRef)
        })
      } catch (e) {
        throw e
      }
    }),
    uploadGameImg: firestoreAction(async (context, { gameId, image }) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const url = await uploadImage(image, 'games', gameId)
        const gameRef = db.collection('games').doc(gameId)
        await gameRef.update({ imgUrl: url })
      } catch (e) {
        throw e
      }
    })
  },
  getters: {
    games (state) {
      return state.games
    },
    gameById: (state) => (id) => {
      return state.games.find(g => g.id === id)
    }
  }
}
