import Vue from 'vue'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(VuetifyToast, {
  x: 'right', // default
  y: 'bottom', // default
  color: 'primary', // default
  iconColor: 'white', // default
  classes: [
    'body-2'
  ],
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  closeText: '', // default
  closeIcon: 'mdi-close', // default
  closeColor: 'black', // default
  slot: [], //default
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
});
