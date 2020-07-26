import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import titlePlugin from './plugins/title.plugin'
import VueMeta from 'vue-meta'
import './plugins/toast'
// import './plugins/gmap'
import './plugins/vuetify-google-autocomplete'
import dateFilter from './filters/dateFilter'
import AppLoader from './components/AppLoader'
import AppDialog from './components/AppDialog'
import AppSnackbar from './components/AppSnackbar'
import AppGamesList from './components/AppGamesList'
import GameCard from './components/GameCard'
import GameOrganizer from './components/card-partials/GameOrganizer'
import GameSubtitle from './components/card-partials/GameSubtitle'
import GameDetails from './components/card-partials/GameDetails'
import GameRoaster from './components/card-partials/GameRoaster'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import './registerServiceWorker'

Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.use(CompositionApi)
Vue.filter('date', dateFilter)
Vue.component('app-loader', AppLoader)
Vue.component('app-snackbar', AppSnackbar)
Vue.component('app-dialog', AppDialog)
Vue.component('app-games-list', AppGamesList)
Vue.component('game-card', GameCard)
Vue.component('game-organizer', GameOrganizer)
Vue.component('game-subtitle', GameSubtitle)
Vue.component('game-details', GameDetails)
Vue.component('game-roaster', GameRoaster)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyBVY5kmGjKIEQ12Tj8-0mbKMMaMPILM_ZM',
  authDomain: 'soccer-mates-1fb7a.firebaseapp.com',
  databaseURL: 'https://soccer-mates-1fb7a.firebaseio.com',
  projectId: 'soccer-mates-1fb7a',
  storageBucket: 'soccer-mates-1fb7a.appspot.com',
  messagingSenderId: '595703259181',
  appId: '1:595703259181:web:11509f08ed1f409e70d8a4',
  measurementId: 'G-0JHGX535E0'
})

const messaging = firebase.messaging()

// Add the public key generated from the console here.
messaging.usePublicVapidKey('BJw6qT6IspP2hnik9OA-yCbI5o8pR3-dovaP7dwWxjC1-9Ecuxs-AP4fjAxxrlL9MEdnRyB1Dab0JraQ5iIPdus')

messaging.requestPermission().then(() => {
  console.log('Notification permission granted.')
  messaging.getToken().then((token) => {
    console.log(token)
  })
}).catch((err) => {
  console.log('Unable to get permission to notify.', err)
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: (h) => h(App)
    }).$mount('#app')
  }
})
