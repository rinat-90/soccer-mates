<template>
  <div>
    <top-bar title="Activities" with-actions>
      <template #right-actions>
        <v-btn icon to="/create-game"><v-icon>mdi-plus</v-icon></v-btn>
      </template>
    </top-bar>
<!--    <v-app-bar app color="primary" dark>-->
<!--      <v-toolbar-title>Activities</v-toolbar-title>-->
<!--      <v-spacer></v-spacer>-->
<!--      <v-btn icon to="/create-game"><v-icon>mdi-plus</v-icon></v-btn>-->
<!--    </v-app-bar>-->
  </div>
</template>

<script>
export default {
  name: 'MyGames'
}
</script>

<style scoped>

</style>
