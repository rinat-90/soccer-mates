<template>
  <v-row v-if="userId">
    <player-profile :player-id="userId" />
  </v-row>
</template>

<script>
import PlayerProfile from '../components/PlayerProfile'
export default {
  name: 'Profile',
  components: { PlayerProfile },
  metaInfo () {
    return {
      title: this.$title('Profile')
    }
  },
  computed: {
    userId () {
      return this.$store.getters.info.userId
    }
  }
}
</script>

<style scoped>

</style>
