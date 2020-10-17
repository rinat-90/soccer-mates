<template>
  <player-profile :player-id="userId" />
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
