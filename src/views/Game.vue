<template>
  <v-row>
    <v-col cols="12" sm="12" md="10" offset-md="1" ld="10" offset-lg="1">
      <!--    <v-card v-if="game">-->
      <!--      <v-img :src="game.imgUrl" :height=" width < 950 ? '200px' : '350px'" />-->
      <!--      <v-card-title>-->
      <!--        <div>{{ game.title }}</div>-->
      <!--        <v-spacer></v-spacer>-->
      <!--        <v-chip v-if="isCanceled" color="red" outlined>{{ game.status }}</v-chip>-->
      <!--      </v-card-title>-->
      <!--      <v-card-subtitle>-->
      <!--        {{ game.date | date('date') }}-->
      <!--      </v-card-subtitle>-->
      <!--      <v-divider></v-divider>-->
      <!--      <v-card-text>-->
      <!--        <div class="mb-1" style="color: green">-->
      <!--          <v-icon>mdi-map-marker</v-icon>-->
      <!--          <span class="ml-2">{{ game.address }}</span>-->
      <!--        </div>-->
      <!--        <div class="mb-1">-->
      <!--          <v-icon>mdi-clock-time-three-outline</v-icon>-->
      <!--          <span class="ml-2">{{getTime }}</span>-->
      <!--        </div>-->
      <!--        <div class="mb-1">-->
      <!--          <v-icon>mdi-cog</v-icon>-->
      <!--          <span class="ml-2">{{ game.skillLevel }}</span>-->
      <!--        </div>-->
      <!--        <v-divider class="mt-3"></v-divider>-->
      <!--        <div class="mt-3">-->
      <!--          <b class="text-capitalize">Event Organizer</b><br>-->
      <!--          <span style="color: green" v-if="creator.displayName">{{ creator.displayName }}</span>-->
      <!--        </div>-->
      <!--        <v-divider class="mt-3"></v-divider>-->
      <!--        <div class="mt-3">-->
      <!--          <b class="text-capitalize">About the event</b><br>-->
      <!--          <div v-html="game.desc" class="pa-3"></div>-->
      <!--        </div>-->
      <!--        <v-divider class="mt-3"></v-divider>-->
      <!--        <div class="mt-3">-->
      <!--          <div class="d-flex">-->
      <!--            <b class="text-capitalize">Players roaster</b><br>-->
      <!--            <v-spacer></v-spacer>-->
      <!--            <span>{{ spots }}</span>-->
      <!--          </div>-->
      <!--          <div class="mt-2" v-if="goingPlayers.length">-->
      <!--            <v-chip-->
      <!--              v-for="item in goingPlayers" :key="item"-->
      <!--              :color="info.userId === item ? 'primary': ''"-->
      <!--              class="mr-2 mb-2">-->
      <!--              {{ playerById(item)['displayName']  }}-->
      <!--            </v-chip>-->
      <!--          </div>-->
      <!--          <div class="mt-2 pl-3" v-else>-->
      <!--            <p>Roaster empty</p>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </v-card-text>-->
      <!--      <v-card-actions>-->
      <!--        <v-spacer></v-spacer>-->
      <!--        <v-btn v-if="isCreator" :disabled="isCanceled" color="primary" @click="dialog = !dialog">Edit</v-btn>-->
      <!--        <v-btn v-if="!isGoing" :disabled="isFilled || isGoing || isCanceled || isFinished" color="primary" @click="join(game.id)">Join</v-btn>-->
      <!--        <v-btn v-else color="orange lighten-2" dark @click="unjoin(game.id)">Unjoin</v-btn>-->
      <!--      </v-card-actions>-->
      <!--    </v-card>-->
      <!--    <app-card v-if="game" :game="game" :type="'long'" />-->

      <game-card v-if="game != null" :game="game" :type="'long'">
        <template #image="{ size, imgUrl }">
          <v-img v-if="imgUrl" :height="size" :src="imgUrl"></v-img>
        </template>
        <template #subtitle="{ subtitle, status }">
          <game-subtitle :subtitle="subtitle" :status="status" />
        </template>
        <template #gameDetails="{ skill, address, date, time }">
          <game-details :skill="skill" :address="address" :date="date" :time="time" />
        </template>

        <template #gameInfo="{ game, creator, roaster, subtitle }">
          <v-divider class="mt-2"></v-divider>
          <v-subheader class="font-weight-bold">Organizer</v-subheader>
          <game-organizer v-if="creator" :name="creator.displayName" :imgUrl="creator.imgUrl" />

          <v-divider class="mt-2"></v-divider>
          <v-subheader class="font-weight-bold">About the game</v-subheader>
          <div v-html="game.desc"></div>

          <v-divider class="mt-2"></v-divider>
          <div class="d-flex mb-2">
            <v-subheader class="font-weight-bold">Roaster</v-subheader>
            <v-spacer></v-spacer>
            <game-subtitle class="align-self-center" :subtitle.sync="subtitle" />
          </div>
          <game-roaster :roaster.sync="roaster" />
        </template>
        <template #gameActions="{ isGoing, isCanceled, isFinished, isFilled, isCreator, join, unjoin }">
          <v-spacer></v-spacer>
          <v-btn v-if="isCreator" :disabled.sync="isCanceled" color="primary" @click="dialog = !dialog">Edit</v-btn>
          <v-btn v-if="!isGoing" :disabled="isFilled || isGoing || isCanceled || isFinished" color="primary" @click="join(game.id)">Join</v-btn>
          <v-btn v-else color="orange lighten-2" dark @click="unjoin(game.id)">Unjoin</v-btn>
        </template>
      </game-card>

      <app-loader v-if="loading"></app-loader>
      <app-dialog title="Edit Game" :dialog="dialog" @onClose="dialog = !dialog">
        <CreateGameForm :type="'edit'" @onClose="dialog = !dialog" @onInput="inputHandler"/>
      </app-dialog>
      <app-snackbar :text="text" :type="'success'" :snackbar="snackbar" @onDismiss="snackbar = !snackbar" />
    </v-col>
  </v-row>
</template>

<script>
  import useGame from "../composables/useGame";
  import { mapGetters } from 'vuex';
  import moment from 'moment';
  import AppDialog from "../components/AppDialog";
  import CreateGameForm from "../components/Forms/CreateGameForm";
  import GameCard from "../components/GameCard";
  import GameOrganizer from "../components/card-partials/GameOrganizer";
  import GameSubtitle from "../components/card-partials/GameSubtitle";
  import GameDetails from "../components/card-partials/GameDetails";
  import GameRoaster from "../components/card-partials/GameRoaster";
  export default {
    name: "Game",
    components: { AppDialog, CreateGameForm, GameCard, GameOrganizer, GameSubtitle, GameDetails, GameRoaster},
    setup(props, { root }){
      // const id = root.$route.params.id;
      // const { game, isCreator, goingPlayers } = useGame(id);
      //
      // console.log(isCreator)
      // return{
      //   game,
      //   isCreator,
      //   goingPlayers
      // }
    },
    data(){
      return{
        dialog: false,
        snackbar: false,
        text: ''
      }
    },
    computed:{
      ...mapGetters(['error', 'loading', 'games', 'info', 'gameById', 'playerById']),
      getTime(){
        return moment(this.game.time, 'h:mm').format('hh:mm A')
      },
      width(){
        return window.innerWidth;
      },
      game(){
        return this.$store.getters.gameById(this.$route.params.id) || null
      },
      // spots(){
      //   return !this.goingPlayers.length
      //     ? `${this.game.spots} spots left`
      //     : this.isFilled
      //       ? `${this.game.spots} going, All spots filled`
      //       : `${this.goingPlayers.length } going,  ${(+this.game.spots - this.goingPlayers.length )} spots left`
      // },
      // goingPlayers(){
      //   return Object.values(this.game.going)
      // },
      // isGoing(){
      //   return this.goingPlayers.length ? this.goingPlayers.find(g => g === this.info.userId) : false
      // },
      // isFilled(){
      //   return +this.game.spots - this.goingPlayers.length === 0
      // },
      // isCreator(){
      //   return this.creator.id === this.info.userId
      // },
      // isCanceled(){
      //   return this.game.status === 'canceled'
      // },
      // isFinished(){
      //   return this.game.status === 'finished'
      // }
    },
    async mounted() {
      if(this.game == null){
        await this.$store.dispatch('fetchGames')
      }
      // if(this.creator == null){
      //   await this.$store.dispatch('fetchPlayers')
      // }
    },
    methods:{
      // async unjoin(id){
      //   for (const key in this.game.going){
      //     if(this.game.going[key] === this.info.userId){
      //       await this.$store.dispatch('unjoin', {gameId: id, key: key })
      //     }
      //   }
      //
      // },
      // async join(id){
      //   await this.$store.dispatch('join', id)
      // },
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
