<template>
  <v-row v-if="info">
    <player-profile :player-id="info.userId" />
  </v-row>
</template>

<script>
import PlayerProfile from '../components/PlayerProfile'
export default {
  name: 'Profile',
  components: { PlayerProfile },
  computed: {
    info () {
      return this.$store.getters.info
    }
  }
}
</script>

<style scoped>

</style>
