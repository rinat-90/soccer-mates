<template>
  <div>
    <app-games-list v-if="sortedGames.length" :games="sortedGames" :type="'short'" />
    <app-loader v-else />
  </div>
</template>

<script>
  import AppGamesList from "../components/AppGamesList";
  import moment from 'moment'
  import { mapGetters } from 'vuex';
  export default {
    name: 'Home',
    components: {
      AppGamesList
    },
    computed:{
      ...mapGetters(['error', 'loading', 'games']),
      sortedGames(){
        return this.games.length
          ? this.games
            .sort((a,b) => moment(`${a.date}${a.time}`, 'YYYY-MM-DD h:mma') - moment(`${b.date}${b.time}`, 'YYYY-MM-DD h:mma'))
            .map(game => {
              if(moment(`${game.date}${game.time}`, 'YYYY-MM-DD h:mma') < moment(new Date(), 'YYYY-MM-DD h:mma')){
                this.updateGame(game)
              }
              return game
            }).filter(game => game.status !== 'finished')
          : []
      }

    },
    methods:{
      async updateGame(game){
        await this.$store.dispatch('updateGame', {id: game.id, status: 'finished'})
      }
    },
    async mounted(){
      if(!this.games.length){
        await this.$store.dispatch('fetchGames')
      }
    }
  }
</script>
