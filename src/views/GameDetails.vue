<template>
  <div>
    <v-card v-if="game">
      <v-img :src="game.imgUrl" :height=" width < 950 ? '200px' : '350px'" />
      <v-card-title>
        {{ game.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ game.date }}, {{ game.time }}
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <div class="mb-1" style="color: green">
          <v-icon>mdi-map-marker</v-icon>
          <span class="ml-2">{{ game.location }}</span>
        </div>
        <div class="mb-1">
          <v-icon>mdi-clock-time-three-outline</v-icon>
          <span class="ml-2">{{ game.time }}</span>
        </div>
        <div class="mb-1">
          <v-icon>mdi-cog</v-icon>
          <span class="ml-2">{{ game.skillLevel }}</span>
        </div>
        <v-divider class="mt-3"></v-divider>
        <div class="mt-3">
          <b>Event Organizer</b><br>
          <span style="color: green">Joe Doe</span>
        </div>
        <v-divider class="mt-3"></v-divider>
        <div class="mt-3">
          <b>About the event</b><br>
          <p>{{ game.desc }}</p>
        </div>

        <v-btn v-if="!isGoing" color="primary" @click="getSpot(game.id)">Join</v-btn>
        <v-btn v-else color="primary">Cancel</v-btn>
      </v-card-text>

    </v-card>
    <app-loader v-else></app-loader>
  </div>
</template>

<script>
  import AppCard from "../components/AppCard";
  import { mapGetters } from 'vuex';
  export default {
    name: "GameDetails",
    components: { AppCard },
    computed:{
      ...mapGetters(['error', 'loading', 'games', 'info']),
      width(){
        return window.innerWidth;
      },
      game(){
        return this.games.filter(g => g.id === this.$route.params.id)[0] || null
      },
      spots(){
        return !this.game.going ? `${this.game.spots} spots left` : `${this.game.going.length} going, ${this.going.length - this.game.spots} left`
      },
      isGoing(){
        return this.game.going ? this.game.going.find(g => g === this.info.userId) : false
      }
    },
    async mounted() {
      if(!this.games.length){
        await this.$store.dispatch('fetchGames')
      }
    },
    methods:{
      async getSpot(id){
        await this.$store.dispatch('getSpot', id)
      }
    }
  }
</script>

<style scoped>

</style>
