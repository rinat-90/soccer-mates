import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon, VTextField } from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
// don't forget to import CSS styles
import 'tiptap-vuetify/dist/main.css'
// Vuetify's CSS styles
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon,
    VTextField
  }
})

const vuetify = new Vuetify({
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
Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'mdi'
})

export default vuetify
