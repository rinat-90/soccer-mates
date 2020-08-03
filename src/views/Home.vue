<template>
  <app-games-list v-if="games.length" :games="games" :type="'small'" />
  <app-loader v-else-if="loading" />
  <div v-else class="text-center">Currently, there are no games</div>
</template>

<script>
import AppGamesList from '../components/AppGamesList'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: { AppGamesList },
  metaInfo () {
    return {
      title: this.$title('Games')
    }
  },
  computed: {
    ...mapGetters(['error', 'loading', 'games']),
    sortedGames () {
      return this.games.length
        ? this.games
          .sort((a, b) => moment(`${a.date}${a.time}`, 'YYYY-MM-DD h:mma') - moment(`${b.date}${b.time}`, 'YYYY-MM-DD h:mma'))
          .map(game => {
            if (moment(`${game.date}${game.time}`, 'YYYY-MM-DD h:mma') < moment(new Date(), 'YYYY-MM-DD h:mma')) {
              // this.updateGame(game)
            }
            return game
          }).filter(game => game.status !== 'finished')
        : []
    }
  },
  async mounted () {
    if (!this.games.length) {
      await this.$store.dispatch('bindGames')
    }
  }

}
</script>
