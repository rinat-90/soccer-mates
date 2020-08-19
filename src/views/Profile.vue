<template>
  <div>
    <top-bar :title="info.displayName" with-actions>
      <template #right-actions>
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
      </template>
    </top-bar>
    <v-row v-if="info.userId">
      <player-profile :player-id="info.userId" />
    </v-row>
  </div>
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
    info () {
      return this.$store.getters.info
    }
  }
}
</script>

<style scoped>

</style>
