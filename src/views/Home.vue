<template>
  <div>
    <top-bar  title="SOCCER CREW" />
    <app-loader v-if="loading" />
    <app-games-list v-if="games.length" :games="games" :type="'small'" />
    <div v-if="!games.length && !loading" class="text-center">Currently, there are no games</div>
  </div>
</template>

<script>
import AppGamesList from '../components/AppGamesList'
import TopBar from '@/components/TopBar'
import useGames from '@/composables/useGames'
import { onMounted } from '@vue/composition-api'
export default {
  name: 'Home',
  components: { TopBar, AppGamesList },
  metaInfo () {
    return {
      title: this.$title('Games')
    }
  },
  data () {
    return {
      loading: false,
      games: []
    }
  },
  async mounted () {
    this.loading = true
    this.games = await this.$store.dispatch('fetchGames')
    this.loading = false
  },
  setup () {
    const { games, getGames } = useGames()

    onMounted(async () => {
      await getGames()
    })
    return {
      games1: games
    }
  }

}
</script>
