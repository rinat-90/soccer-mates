import { db } from '@/firebase/firebaseInit'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import firebase from "firebase";
export default {
  state: { messages: [] },
  mutations: vuexfireMutations,
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
    },
    async createChat ({ dispatch }, payload) {
      const uid = await dispatch('getUid')
      const chatsRef = db.collection('chats')
      const playersRef = db.collection('players')
      const creatorRef = playersRef.doc(uid)
      const { id } = await chatsRef.add({ subscribers: payload, creator: creatorRef, id: playersRef.id })
      await chatsRef.doc(id).update({ id })
      await creatorRef.update({ chats: firebase.firestore.FieldValue.arrayUnion(id) })
      for (const userId of payload) {
        await playersRef.doc(userId).update({
          chats: firebase.firestore.FieldValue.arrayUnion(id)
        })
      }
      return id
    },
    async getLastMsgFromChat ({ dispatch }) {
      const messages = []
      const chatRef = db.collection('chats')
      const uid = await dispatch('getUid')
      // eslint-disable-next-line no-unused-vars
      const { chats } = ((await db.collection('players').doc(uid).get()).data())
      const res = await chatRef.where('id', 'in', chats).get()
      console.log(res.docs)
      for (const snap of res.docs) {
        let msg = {}
        const id = snap.id
        const data = await snap.ref.collection('messages').orderBy('date').get()
        const len = data.docs.length
        const lastMsg = data.docs[len - 1].data()
        console.log(lastMsg.text)
        const { displayName, userId, imgUrl } = ((await lastMsg.playerRef.get()).data())
        msg = { id, displayName, userId, imgUrl, date: lastMsg.date, text: lastMsg.text }
        messages.push(msg)
      }
      return messages
    }
  },
  getters: {
    messages (state) {
      return state.messages
    }
  }
}
