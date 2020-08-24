<template>
  <div>
    <top-bar title="Activities" with-actions>
      <template #left-actions>
        <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
      </template>
      <template #right-actions>
        <v-btn icon to="/create-game"><v-icon>mdi-plus</v-icon></v-btn>
      </template>
    </top-bar>
    <v-row>
      <tabs :tab-items="['upcoming', 'past', 'hosting']" height="calc(100vh - 175px)">
        <template #upcoming>
          <game-list v-if="goingGames.length" :games="goingGames" />
          <app-loader v-else />
        </template>
        <template #past>
          <game-list v-if="pastGames.length" :games="pastGames" />
          <app-loader v-else />
        </template>
        <template #hosting>
          <game-list v-if="hostingGames.length" :games="hostingGames" />
          <app-loader v-else />
        </template>
      </tabs>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GameList from '@/components/GameList'
import Tabs from '@/components/Tabs'
export default {
  name: 'MyGames',
  components: { GameList, Tabs },
  data () {
    return {
      tab: null,
      tabs: ['upcoming', 'past', 'hosting', 'loading'],
      player: null,
      hostingGames: [],
      pastGames: [],
      goingGames: []
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    if (!Object.keys(this.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    if (this.player === null) {
      this.player = await this.$store.dispatch('fetchPlayerById', this.info.userId)
      this.hostingGames = await this.$store.dispatch('fetchHostingGames')
      this.pastGames = await this.$store.dispatch('fetchPastGames')
      this.goingGames = await this.$store.dispatch('fetchGoingGames')
    }


  }
}
</script>

<style scoped>

</style>
