<template>
  <div>
    <top-bar  title="SOCCER CREW" />
    <app-skeleton-loader
      v-if="loading"
      type-options="list-item-avatar, image, card-heading, list-item-three-line"
      :count="3" />
    <div v-else-if="!games.length && !loading" class="text-center">Currently, there are no games</div>
    <app-games-list v-else :games="games" :type="'small'" />
  </div>
</template>

<script>
import AppGamesList from '../components/AppGamesList'
import TopBar from '@/components/TopBar'
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
    if (!this.games.length) {
      this.games = await this.$store.dispatch('fetchGames')
    }
    setInterval(() => {
      this.loading = false
    }, 100)
  }

}
</script>
