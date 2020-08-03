<template>
  <div>
    <app-navigation />
    <v-container>
      <app-toast />
      <router-view />
    </v-container>
  </div>

</template>

<script>
import AppNavigation from '../components/AppNavigation'
import { mapGetters } from 'vuex'
import messages from '../utils/messages'
export default {
  name: 'Main',
  components: { AppNavigation },
  computed: {
    ...mapGetters(['error', 'info', 'info1', 'loading'])
  },
  async mounted () {
    if (!Object.keys(this.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  // created () {
  //   if (!Object.keys(this.info1).length) {
  //     this.$store.dispatch('bindInfo')
  //   }
  // },
  watch: {
    error (val) {
      if (val) {
        this.showSnack({
          text: messages[this.error.code],
          color: 'red',
          timeout: 3500
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
