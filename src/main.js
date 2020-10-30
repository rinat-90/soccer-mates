import Vue from 'vue'
import VueMeta from 'vue-meta'
import CompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import titlePlugin from './plugins/title.plugin'
// import './plugins/gmap'
import './plugins/vuetify-google-autocomplete'
import dateFilter from './filters/dateFilter'
import DropDownMenu from '@/components/DropDownMenu'
import TopBar from '@/components/TopBar'
import AppLoader from './components/AppLoader'
import AppToast from './components/AppToast'
import AppDialog from './components/AppDialog'
import AppGamesList from './components/AppGamesList'
import AppSkeletonLoader from '@/components/AppSkeletonLoader'
import AppAvatar from '@/components/AppAvatar'
import AppHeader from '@/components/AppHeader'
import GameCard from './components/GameCard'
import GameOrganizer from './components/card-partials/GameOrganizer'
import GameThumbnail from './components/card-partials/GameThumbnail'
import GameSubtitle from './components/card-partials/GameSubtitle'
import GameDetails from './components/card-partials/GameDetails'
import GameRoaster from './components/card-partials/GameRoaster'

import { auth } from './firebase/firebaseInit'
import './registerServiceWorker'

Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.use(CompositionApi)
Vue.filter('date', dateFilter)
Vue.component('drop-down-menu', DropDownMenu)
Vue.component('top-bar', TopBar)
Vue.component('app-loader', AppLoader)
Vue.component('app-toast', AppToast)
Vue.component('app-dialog', AppDialog)
Vue.component('app-games-list', AppGamesList)
Vue.component('app-skeleton-loader', AppSkeletonLoader)
Vue.component('app-avatar', AppAvatar)
Vue.component('app-header', AppHeader)
Vue.component('game-card', GameCard)
Vue.component('game-organizer', GameOrganizer)
Vue.component('game-thumbnail', GameThumbnail)
Vue.component('game-subtitle', GameSubtitle)
Vue.component('game-details', GameDetails)
Vue.component('game-roaster', GameRoaster)
Vue.config.productionTip = false
let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: (h) => h(App)
    }).$mount('#app')
  }
})
