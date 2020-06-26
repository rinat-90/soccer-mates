<template>
  <v-row>
    <app-games-list />
  </v-row>
</template>

<script>
  import AppGamesList from "../components/AppGamesList";
  export default {
    name: 'Home',
    components: {
      AppGamesList
    }
  }
</script>
