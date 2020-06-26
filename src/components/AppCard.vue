<template>
  <v-card :to="`/game/${game.id}`">
    <v-card-title>
      <v-avatar size="35" class="mr-2">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>
      <span>Joe Doe</span>
    </v-card-title>
    <v-img src="https://mgoblue.com/images/2014/8/1/10197644.jpeg" height="200px" />
    <v-card-title>
      {{ game.title }}
    </v-card-title>
    <v-card-subtitle>
      1 going, 11 spots left
    </v-card-subtitle>
    <v-card-text>
      <div class="mb-1">
        <v-icon>mdi-cog</v-icon>
        <span class="ml-2">{{ game.skill }}</span>
      </div>
      <div class="mb-1">
        <v-icon>mdi-clock-time-eleven-outline</v-icon>
        <span class="ml-2">{{ game.date }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "AppCard",
    props: ['game']
  }
</script>

<style scoped>

</style>
