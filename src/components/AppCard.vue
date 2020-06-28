<template>
  <v-card :to="`/game/${game.id}`">
    <v-card-title>
      <v-avatar size="35" class="mr-2">
        <img :src="game.imgUrl" alt="John">
      </v-avatar>
      <span v-if="player">{{ player.displayName }}</span>
    </v-card-title>
    <v-img :src="game.imgUrl" height="200" />
    <v-card-title>
      {{ game.title }}
    </v-card-title>
    <v-card-subtitle v-if="game.spots">
      <div class="d-flex">
        <div>{{ spots }}</div>
        <v-spacer></v-spacer>
        <v-chip v-if="isCanceled" small outlined color="red">{{ game.status }}</v-chip>
      </div>

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
  import { mapGetters } from 'vuex';
  export default {
    name: "AppCard",
    props: ['game', 'type'],
    computed:{
      ...mapGetters(['playerById']),
      spots(){
        return !this.game.going.length
          ? `${this.game.spots} spots left`
          : this.isFilled
            ? `${this.game.spots} going, All spots filled`
            : `${this.game.going.length } going,  ${(+this.game.spots - this.game.going.length )} spots left`
      },
      isFilled(){
        return +this.game.spots - this.game.going.length === 0
      },
      player(){
        return this.game.creatorId ? this.playerById(this.game.creatorId) : null
      },
      isCanceled(){
        return this.game.status === 'canceled'
      }
    },
    async mounted() {
      if(this.player == null){
        await this.$store.dispatch('fetchPlayers')
      }
    }
  }
</script>

<style scoped>

</style>
