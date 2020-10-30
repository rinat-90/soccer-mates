<template>
  <div>
    <app-header title="Activities" :back="false">
      <template #left-actions>
        <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
      </template>
      <template #right-actions>
        <v-btn icon to="/create-game"><v-icon>mdi-plus</v-icon></v-btn>
      </template>
    </app-header>
    <v-row  height="calc(100vh - 175px)">
      <tabs :tab-items="['upcoming', 'past', 'hosting']" height="calc(80vh)">
        <template #upcoming>
          <app-skeleton-loader v-if="loading" :cols="12" :count="3" type-options="list-item-three-line" />
          <div v-if="!loading && !goingGames.length">There are no games</div>
          <game-list v-else :games="goingGames" />
        </template>
        <template #past>
          <app-skeleton-loader v-if="loading" :cols="12" :count="3" type-options="list-item-three-line" />
          <div v-if="!loading && !pastGames.length">There are no games</div>
          <game-list v-else :games="pastGames" />
        </template>
        <template #hosting>
          <app-skeleton-loader v-if="loading" :cols="12" :count="3" type-options="list-item-three-line" />
          <div v-if="!loading && !hostingGames.length">There are no games</div>
          <game-list v-else :games="hostingGames" />
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
      tabs: ['upcoming', 'past', 'hosting'],
      loading: false,
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
      this.loading = true
      this.player = await this.$store.dispatch('fetchPlayerById', this.info.userId)
      this.hostingGames = await this.$store.dispatch('fetchHostingGames')
      this.pastGames = await this.$store.dispatch('fetchPastGames')
      this.goingGames = await this.$store.dispatch('fetchGoingGames')
      setTimeout(() => {
        this.loading = false
      }, 0)
    }
  }
}
</script>

<style scoped>

</style>
