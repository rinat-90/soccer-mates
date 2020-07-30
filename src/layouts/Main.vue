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
import AppToast from '../components/AppToast'
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  components: { AppNavigation, AppToast },
  computed: {
    ...mapGetters(['error', 'info', 'loading'])
  },
  async mounted () {
    if (!Object.keys(this.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  }
}
</script>

<style scoped>

</style>
