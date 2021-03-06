import firebase from 'firebase/app'
import { db } from '@/firebase/firebaseInit'
import { uploadImage } from './util/helper'
import moment from 'moment'

export default {
  actions: {
    async createGame ({ commit, dispatch }, { image, ...rest }) {
      const uid = await dispatch('getUid')
      const gamesRef = db.collection('games')
      const creatorRef = db.collection('players').doc(uid)
      const gameData = {
        creator: creatorRef,
        roaster: [],
        createdAt: Date.now(),
        ...rest
      }
      const { id } = await gamesRef.add(gameData)
      const chatId = await dispatch('createGameChat', id)
      const url = await uploadImage(image, 'games', id)
      await gamesRef.doc(id).update({ imgUrl: url, id, chatId })
      return id
    },
    async fetchGames ({ commit }) {
      const games = []
      const date = moment().format('YYYY-MM-DD')
      const gamesRef = db.collection('games')
      const rawGames = await gamesRef
        .where('date', '>=', date)
        .orderBy('date', 'asc')
        .orderBy('startTime', 'asc').get()

      rawGames.forEach(async snap => {
        const game = snap.data()
        game.id = snap.id
        game.creator = ((await game.creator.get()).data())
        games.push(game)
      })
      return games
    },
    async fetchGameById ({ commit }, id) {
      // eslint-disable-next-line no-useless-catch
      try {
        const game = ((await db.collection('games').doc(id).get()).data())
        game.creator = ((await game.creator.get()).data())
        if (game.roaster.length) {
          for (let i = 0; i < game.roaster.length; i++) {
            game.roaster[i] = ((await game.roaster[i].get()).data())
          }
        }
        return game
      } catch (error) {
        throw error
      }
    },
    async join ({ commit, dispatch }, gameId) {
      const uid = await dispatch('getUid')
      const playerRef = db.collection('players').doc(uid)
      const gameRef = db.collection('games').doc(gameId)
      const { chatId } = ((await gameRef.get()).data())
      const chatRef = db.collection('chats').doc(chatId)
      await playerRef.update({
        games: firebase.firestore.FieldValue.arrayUnion(gameRef),
        chats: firebase.firestore.FieldValue.arrayUnion(chatRef)
      })
      await gameRef.update({ roaster: firebase.firestore.FieldValue.arrayUnion(playerRef) })
      return ((await playerRef.get()).data())
    },
    async quit ({ commit, dispatch }, gameId) {
      const uid = await dispatch('getUid')
      const playerRef = db.collection('players').doc(uid)
      const gameRef = db.collection('games').doc(gameId)
      const { chatId } = ((await gameRef.get()).data())
      const chatRef = db.collection('chats').doc(chatId)
      await playerRef.update({
        games: firebase.firestore.FieldValue.arrayRemove(gameRef),
        chats: firebase.firestore.FieldValue.arrayRemove(chatRef)
      })
      await gameRef.update({ roaster: firebase.firestore.FieldValue.arrayRemove(playerRef) })
    },
    async updateGame ({ commit }, { id, ...rest }) {
      await db.collection('games').doc(id).update({ ...rest })
    },
    async updateGameImage ({ commit }, { gameId, image }) {
      const url = await uploadImage(image, 'games', gameId)
      const gameRef = db.collection('games').doc(gameId)
      await gameRef.update({ imgUrl: url })
      return url
    },
    async fetchHostingGames ({ dispatch }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const games = []
        const date = moment().format('YYYY-MM-DD')
        const uid = await dispatch('getUid')
        const creator = db.collection('players').doc(uid)
        const gamesRef = db.collection('games')
        const gamesRaw = await gamesRef
          .where('date', '>=', date)
          .where('creator', '==', creator)
          .orderBy('date', 'asc')
          .orderBy('startTime', 'asc').get()
        for (const g of gamesRaw.docs) {
          const game = g.data()
          game.creator = ((await game.creator.get()).data())
          game.id = g.id
          games.push(game)
        }
        return games
      } catch (error) {
        throw error
      }
    },
    async fetchPastGames ({ dispatch }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const games = []
        const date = moment().format('YYYY-MM-DD')
        const uid = await dispatch('getUid')
        const creator = db.collection('players').doc(uid)
        const gamesRef = db.collection('games')
        const gamesRaw = await gamesRef
          .where('creator', '==', creator)
          .where('date', '<', date)
          .orderBy('date', 'asc')
          .orderBy('startTime', 'asc').get()
        for (const g of gamesRaw.docs) {
          const game = g.data()
          game.creator = ((await game.creator.get()).data())
          game.id = g.id
          games.push(game)
        }
        return games
      } catch (error) {
        throw error
      }
    },
    async fetchGoingGames ({ dispatch }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const games = []
        const date = moment().format('YYYY-MM-DD')
        const uid = await dispatch('getUid')
        const player = db.collection('players').doc(uid)
        const gamesRef = db.collection('games')
        const gamesRaw = await gamesRef
          .where('date', '>=', date)
          .where('roaster', 'array-contains', player)
          .orderBy('date', 'asc')
          .orderBy('startTime', 'asc').get()
        for (const g of gamesRaw.docs) {
          const game = g.data()
          game.creator = ((await game.creator.get()).data())
          game.id = g.id
          games.push(game)
        }
        return games
      } catch (error) {
        throw error
      }
    }
  }
}
