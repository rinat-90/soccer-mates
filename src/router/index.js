import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'All games',
    component: Home,
    meta: { layout: 'main', auth: true, bottomNav: true }
  },
  {
    path: '/my-games',
    name: 'My games',
    component: () => import('../views/MyGames.vue'),
    meta: { layout: 'main', auth: true, bottomNav: true }
  },
  {
    path: '/signin',
    name: 'Sign in',
    meta: { layout: 'empty', bottomNav: false },
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty', bottomNav: false },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/players',
    name: 'Players',
    meta: { layout: 'main', auth: true, bottomNav: true },
    component: () => import('../views/Players.vue')
  },
  {
    path: '/player/:id',
    name: 'Player',
    meta: { layout: 'main', auth: true, bottomNav: false },
    component: () => import('../views/Player.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true, bottomNav: true },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/messages',
    name: 'Messages',
    meta: { layout: 'main', auth: true, bottomNav: true },
    component: () => import('../views/Messages.vue')
  },
  {
    path: '/messages/chat/:id',
    name: 'Chat',
    meta: { layout: 'main', auth: true, bottomNav: false },
    component: () => import('../components/Chat.vue')
  },
  {
    path: '/game/:id',
    name: 'Game',
    meta: { layout: 'main', auth: true, bottomNav: false },
    component: () => import('../views/Game.vue')
  },
  {
    path: '/game/:id/edit',
    name: 'Game Edit',
    meta: { layout: 'main', auth: true, bottomNav: false },
    component: () => import('../views/EditGame.vue')
  },
  {
    path: '/new-conversation',
    name: 'New Conversation',
    meta: { layout: 'main', auth: true, bottomNav: false },
    component: () => import('../views/NewConversation.vue')
  },
  {
    path: '/create-game',
    name: 'Create Game',
    meta: { layout: 'main', auth: true, bottomNav: false },
    component: () => import('../views/CreateGame.vue')
  },
  {
    path: '*',
    name: '404: Page not found',
    meta: { layout: 'main', auth: true, bottomNav: false },
    component: () => import('../views/NotFound.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiredAuth = to.matched.some(record => record.meta.auth)
  if (requiredAuth && !currentUser) {
    next('/signin')
  } else {
    next()
  }
})

export default router
