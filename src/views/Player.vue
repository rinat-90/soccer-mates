<template>
  <v-row v-if="playerId">
    <player-profile :player-id="playerId" />
  </v-row>
</template>

<script>
import PlayerProfile from '../components/PlayerProfile'
export default {
  name: 'Player',
  components: { PlayerProfile },
  data () {
    return {
      playerId: ''
    }
  },
  mounted () {
    this.playerId = this.$route.params.id
  }
}
</script>

<style scoped>

</style>
