import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.green.darken1, // #D32F2F
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base // #3F51B5
      }
    }
  }
})
