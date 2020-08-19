<template>
  <div>
<!--    <app-navigation />-->
    <v-container>
      <app-toast />
      <router-view />
    </v-container>
    <bottom-nav />
  </div>

</template>

<script>
import AppNavigation from '../components/AppNavigation'
import BottomNav from "@/components/BottomNav";
import { mapGetters } from 'vuex'
import messages from '../utils/messages'
export default {
  name: 'Main',
  components: { AppNavigation, BottomNav },
  computed: {
    ...mapGetters(['error', 'info', 'loading'])
  },
  async mounted () {
    if (!Object.keys(this.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
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
