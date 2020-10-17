import { db } from '@/firebase/firebaseInit'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
export default {
  state: {
    messages: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindMessages: firestoreAction(({ bindFirestoreRef }, id) => {
      return bindFirestoreRef('messages', db.collection('chats').doc(id).collection('messages').orderBy('date', 'asc'))
    }),
    unbindMessages: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('messages')
    }),
    sendMsg: firestoreAction(async ({ dispatch }, payload) => {
      const uid = await dispatch('getUid')
      const { chatId, text, date } = payload
      const playerRef = db.collection('players').doc(uid)
      return await db.collection('chats').doc(chatId).collection('messages').add({ text, date, playerRef })
    }),
    async createGameChat ({ dispatch }, payload) {
      const uid = await dispatch('getUid')
      const chatsRef = db.collection('chats')
      const creatorRef = db.collection('players').doc(uid)
      const { id } = await chatsRef.add({ gameId: payload, creator: creatorRef })
      return id
    }
  },
  getters: {
    messages (state) {
      return state.messages
    }
  }
}
