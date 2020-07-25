<template>
  <div>
    <app-navigation />
    <v-container>
      <router-view />
    </v-container>
  </div>

</template>

<script>
import AppNavigation from '../components/AppNavigation'
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  components: { AppNavigation },
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
