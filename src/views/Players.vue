<template>
  <v-row>
    <v-col cols="6" sm="6" md="4" lg="2" v-for="player in players" :key="player.id">
      <v-card :to="info.userId !== player.id ? `/players/${player.id}` : `/profile`">
        <v-card-text class="text-center">
          <v-avatar size="100" class="mb-3">
            <v-img :src="player.imgUrl"></v-img>
          </v-avatar>
          <div class="text-center">{{ player.displayName }}</div>
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Players',
  metaInfo () {
    return {
      title: this.$title('Players')
    }
  },
  computed: {
    ...mapGetters(['loading', 'error', 'players', 'info'])
  },
  async mounted () {
    if (!this.players.length) {
      await this.$store.dispatch('fetchPlayers')
    }
  }
}
</script>

<style scoped>

</style>
