<template>
  <v-row v-if="games.length">
    <v-col
      sm="12" md="6" lg="4" cols="12"
      v-for="game in games" :key="game.id">
      <app-card :game="game" :type="'short'" />
    </v-col>
  </v-row>
</template>

<script>
  import AppCard from "./AppCard";
  export default {
    name: "AppGamesList",
    props:['games'],
    components:{ AppCard },
  }
</script>

<style scoped>

</style>
