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
    meta: { layout: 'main', auth: true }
  },
  {
    path: '/signin',
    name: 'Sign in',
    meta: { layout: 'empty' },
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/players',
    name: 'Players',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Players.vue')
  },
  {
    path: '/player/:id',
    name: 'Player',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Player.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/game/:id',
    name: 'Game',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Game.vue')
  },
  {
    path: '/create-game',
    name: 'Create Game',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/CreateGame.vue')
  },
  {
    path: '*',
    name: '404: Page not found',
    meta: { layout: 'main', auth: true },
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
