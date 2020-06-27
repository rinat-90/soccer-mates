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
          <b class="text-capitalize">Event Organizer</b><br>
          <span style="color: green" v-if="creator">{{ creator.displayName }}</span>
        </div>
        <v-divider class="mt-3"></v-divider>
        <div class="mt-3">
          <b class="text-capitalize">About the event</b><br>
          <p>{{ game.desc }}</p>
        </div>
        <v-divider class="mt-3"></v-divider>
        <div class="mt-3">
          <div class="d-flex">
            <b class="text-capitalize">Players roaster</b><br>
            <v-spacer></v-spacer>
            <span>{{ spots }}</span>
          </div>
          <div class="mt-2" v-if="game.going.length">
            <v-chip
              v-for="item in game.going" :key="item"
              :color="info.userId === item ? 'primary': ''"
              class="mr-2">
              {{ info.userId === item ? 'You' : playerById(item)['displayName'] }}
            </v-chip>
          </div>
          <div class="mt-2 pl-3" v-else>
            <p>Roaster empty</p>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="isCreator" color="primary" @click="dialog = !dialog">Edit</v-btn>
        <v-btn v-if="!isGoing" :disabled="isFilled || isGoing" color="primary" @click="getSpot(game.id)">Join</v-btn>
<!--        <v-btn v-else-if="isFilled"  color="primary" >Join</v-btn>-->
        <v-btn v-else color="red" dark>Can't make it!</v-btn>
      </v-card-actions>
    </v-card>
    <app-loader v-else></app-loader>
    <app-dialog title="Edit Game" :dialog="dialog" @onClose="dialog = !dialog">
      <CreateGameForm :type="'edit'" />
    </app-dialog>
  </div>
</template>

<script>
  import AppCard from "../components/AppCard";
  import AppDialog from "../components/AppDialog";
  import CreateGameForm from "../components/Forms/CreateGameForm";
  import { mapGetters } from 'vuex';
  export default {
    name: "GameDetails",
    components: { AppCard, AppDialog, CreateGameForm },
    data(){
      return{
        dialog: false
      }
    },
    computed:{
      ...mapGetters(['error', 'loading', 'games', 'info', 'gameById', 'playerById']),
      width(){
        return window.innerWidth;
      },
      game(){
        return this.$store.getters.gameById(this.$route.params.id) || null
      },
      creator(){
        return this.game.creatorId ? this.playerById(this.game.creatorId) : null
      },
      spots(){
        return !this.game.going.length
          ? `${this.game.spots} spots left`
          : this.isFilled
            ? `${this.game.spots} going, All spots filled`
            : `${this.game.going.length } going,  ${(+this.game.spots - this.game.going.length )} spots left`
      },
      isGoing(){
        return this.game.going ? this.game.going.find(g => g === this.info.userId) : false
      },
      isFilled(){
        return +this.game.spots - this.game.going.length === 0
      },
      isCreator(){
        return !!this.creator
      }
    },
    async mounted() {
      if(this.game == null){
        await this.$store.dispatch('fetchGames')
      }
      if(this.player == null){
        await this.$store.dispatch('fetchPlayers')
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
  .text-capitalize{
    text-transform: uppercase;
  }
</style>
