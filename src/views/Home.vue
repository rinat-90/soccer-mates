<template>
  <div>
    <app-games-list v-if="games.length" :games="sortedGames" :creator-title="true" />
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
          ? this.games.sort((a, b) => moment(a.date)  - moment(b.date))
            .sort((a, b) => moment(a.time, 'h:mm').format('h:mm') - moment(b.time, 'h:mm').format('HH:mm'))
            .map(game => {
              if(moment(game.date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')){
                game.status = 'finished'
              }
              if(moment(game.time, 'h:mm').format('hh:mm A') < moment().format('hh:mm A')){
                game.status = 'finished'
              }
              return game
          }).filter(game => game.status !== 'finished')
          : []
          // .map(g => {
          //   if(moment(g.date).format('YYYY-MM-DD') < date){
          //     g.status = 'finished'
          //   }
          //   return g
          // })
      }

    },
    async mounted(){
      if(!this.games.length){
        await this.$store.dispatch('fetchGames')
      }
    }
  }
</script>
