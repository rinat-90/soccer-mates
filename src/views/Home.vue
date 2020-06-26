<template>
  <div>
    <app-games-list v-if="games.length" :games="games" />
    <app-loader v-else />
  </div>
</template>

<script>
  import AppGamesList from "../components/AppGamesList";
  import { mapGetters } from 'vuex';
  export default {
    name: 'Home',
    components: {
      AppGamesList
    },
    computed:{
      ...mapGetters(['error', 'loading', 'games']),

    },
    async mounted(){
      if(!this.games.length){
        await this.$store.dispatch('fetchGames')
      }
    }
  }
</script>
