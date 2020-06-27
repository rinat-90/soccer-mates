import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import AppLoader from "./components/AppLoader";

Vue.component('app-loader', AppLoader);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyBVY5kmGjKIEQ12Tj8-0mbKMMaMPILM_ZM",
  authDomain: "soccer-mates-1fb7a.firebaseapp.com",
  databaseURL: "https://soccer-mates-1fb7a.firebaseio.com",
  projectId: "soccer-mates-1fb7a",
  storageBucket: "soccer-mates-1fb7a.appspot.com",
  messagingSenderId: "595703259181",
  appId: "1:595703259181:web:11509f08ed1f409e70d8a4",
  measurementId: "G-0JHGX535E0"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      vuetify,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});