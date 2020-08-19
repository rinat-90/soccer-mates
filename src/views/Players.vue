<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-text-field v-model="searchVal" prepend-inner-icon="mdi-magnify" color="primary" placeholder="Search..."  class="mt-5" filled rounded dense ></v-text-field>
    </v-app-bar>
    <v-row v-if="filteredPlayers.length">
      <v-col cols="12" lg="10" offset-lg="1">
        <v-row>
          <v-col cols="6" sm="6" md="4" lg="3" v-for="player in filteredPlayers" :key="player.id">
            <v-card :to="info.userId !== player.id ? `/player/${player.id}` : `/profile`">
              <v-card-text class="text-center">
                <v-avatar size="100" class="mb-3">
                  <v-img :src="player.imgUrl"></v-img>
                </v-avatar>
                <div class="text-center">{{ player.displayName }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <app-loader v-else />
  </div>
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
  data () {
    return {
      searchVal: ''
    }
  },
  computed: {
    ...mapGetters(['loading', 'error', 'players', 'info']),
    filteredPlayers () {
      return this.players.length
        ? this.players.filter(player => {
          return player.displayName.toLowerCase().indexOf(this.searchVal.toLowerCase()) > -1
        })
        : []
    }
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
