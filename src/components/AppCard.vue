<template>
  <v-card :to="`/game/${game.id}`">
    <v-card-title>
      <v-avatar size="35" class="mr-2">
        <img :src="game.imgUrl" alt="John">
      </v-avatar>
      <span>Joe Doe</span>
    </v-card-title>
    <v-img :src="game.imgUrl" height="200" />
    <v-card-title>
      {{ game.title }}
    </v-card-title>
    <v-card-subtitle v-if="game.spots">
<!--      {{ spots }}-->
    </v-card-subtitle>
    <v-card-text>
      <div class="mb-1">
        <v-icon>mdi-map-marker</v-icon>
        <span class="ml-2">{{ game.location }}</span>
      </div>
      <div class="mb-1">
        <v-icon>mdi-clock-time-eleven-outline</v-icon>
        <span class="ml-2">{{ game.date }}, {{ game.time}}</span>
      </div>
      <div>
        <v-icon>mdi-cog</v-icon>
        <span class="ml-2">{{ game.skillLevel }}</span>
      </div>
    </v-card-text>

  </v-card>
</template>

<script>
  export default {
    name: "AppCard",
    props: ['game', 'type'],
    computed:{
      // going(){
      //   return !this.game.going.length  ? 0 : this.game.going.length
      // },
      // spots(){
      //   //return ''
      //   return this.going === 0 ? `${this.game.spots} spots left` : `${this.going } going, ${this.going - this.game.spots} left`
      // }
    },
  }
</script>

<style scoped>

</style>
