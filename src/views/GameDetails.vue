<template>
  <div>
    <v-card v-if="game">
      <v-img :src="game.imgUrl" :height=" width < 950 ? '200px' : '350px'" />
      <v-card-title>
        <div>{{ game.title }}</div>
        <v-spacer></v-spacer>
        <v-chip v-if="isCanceled" color="red" outlined>{{ game.status }}</v-chip>
      </v-card-title>
      <v-card-subtitle>
        {{ game.date }}, {{ game.time }}
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <div class="mb-1" style="color: green">
          <v-icon>mdi-map-marker</v-icon>
          <span class="ml-2">{{ game.address }}</span>
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
          <span style="color: green" v-if="creator.displayName">{{ creator.displayName }}</span>
        </div>
        <v-divider class="mt-3"></v-divider>
        <div class="mt-3">
          <b class="text-capitalize">About the event</b><br>
          <div v-html="game.desc" class="pa-3"></div>
        </div>
        <v-divider class="mt-3"></v-divider>
        <div class="mt-3">
          <div class="d-flex">
            <b class="text-capitalize">Players roaster</b><br>
            <v-spacer></v-spacer>
            <span>{{ spots }}</span>
          </div>
          <div class="mt-2" v-if="goingPlayers.length">
            <v-chip
              v-for="item in goingPlayers" :key="item"
              :color="info.userId === item ? 'primary': ''"
              class="mr-2 mb-2">
              {{ playerById(item)['displayName']  }}
            </v-chip>
          </div>
          <div class="mt-2 pl-3" v-else>
            <p>Roaster empty</p>
          </div>
        </div>
        <GmapMap
          ref="map"
          class="map"
          :zoom="11"
          :center="{
            lat: 41.881832,
            lng: -87.623177,
          }" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="isCreator" :disabled="isCanceled" color="primary" @click="dialog = !dialog">Edit</v-btn>
        <v-btn v-if="!isGoing" :disabled="isFilled || isGoing || isCanceled" color="primary" @click="join(game.id)">Join</v-btn>
        <v-btn v-else color="orange lighten-2" dark @click="unjoin(game.id)">Unjoin</v-btn>
      </v-card-actions>
    </v-card>
    <app-loader v-else></app-loader>
    <app-dialog title="Edit Game" :dialog="dialog" @onClose="dialog = !dialog">
      <CreateGameForm :type="'edit'" @onClose="dialog = !dialog" @onInput="inputHandler"/>
    </app-dialog>
    <app-snackbar :text="text" :type="'success'" :snackbar="snackbar" @onDismiss="snackbar = !snackbar" />
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
        dialog: false,
        snackbar: false,
        text: ''
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
        return !this.goingPlayers.length
          ? `${this.game.spots} spots left`
          : this.isFilled
            ? `${this.game.spots} going, All spots filled`
            : `${this.goingPlayers.length } going,  ${(+this.game.spots - this.goingPlayers.length )} spots left`
      },
      goingPlayers(){
        return Object.values(this.game.going)
      },
      isGoing(){
        return this.goingPlayers ? this.goingPlayers.find(g => g === this.info.userId) : false
      },
      isFilled(){
        return +this.game.spots - this.goingPlayers.length === 0
      },
      isCreator(){
        return this.creator.id === this.info.userId
      },
      isCanceled(){
        return this.game.status === 'canceled'
      }
    },
    async mounted() {
      if(this.game == null){
        await this.$store.dispatch('fetchGames')
      }
      if(this.creator == null){
        await this.$store.dispatch('fetchPlayers')
      }
    },
    methods:{
      async unjoin(id){
        for (const key in this.game.going){
          if(this.game.going[key] === this.info.userId){
            await this.$store.dispatch('unjoin', {gameId: id, key: key })
          }
        }

      },
      async join(id){
        await this.$store.dispatch('join', id)
      },
      inputHandler(type){
        if(type === 'update'){
          this.dialog = !this.dialog;
          this.text = 'Successfully updated';
          this.snackbar = !this.snackbar
        }
        if(type === 'cancel-game'){
          this.dialog = !this.dialog;
          this.text = 'The game has been canceled successfully';
          this.snackbar = !this.snackbar
        }
      }
    }
  }
</script>

<style scoped>
  .text-capitalize{
    text-transform: uppercase;
  }
  .map{
    width: 100%;
    height: 200px;
    padding-top: 50px;
  }
</style>
