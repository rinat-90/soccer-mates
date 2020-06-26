<template>
  <v-row v-if="games.length">
    <v-col
      sm="12" md="6" lg="6" cols="12"
      v-for="game in games" :key="game.title">
      <app-card :game="game" />
    </v-col>
  </v-row>
</template>

<script>
  import AppCard from "./AppCard";
  export default {
    name: "AppGamesList",
    components:{ AppCard },
    // data(){
    //   return{
    //     games: [
    //       { id: 1, title: 'Monday Pickup Game', skill: 'All Skill Level', date:'06/03, 12pm', spots: 12 },
    //       { id: 2, title: 'Friday Pickup Game', skill: 'All Skill Level', date:'06/03, 12pm', spots: 12 },
    //       { id: 3, title: 'Synday Pickup Game', skill: 'All Skill Level', date:'06/03, 12pm', spots: 12 },
    //     ]
    //   }
    // }
    computed:{
      games(){
        return this.$store.getters.games
      }
    }
  }
</script>

<style scoped>

</style>
