<template>
  <v-card :to="isRouter">
    <card-organizer v-if="type === 'short'" :creator="creator" />
    <card-game-image :type="type" :img-url="game.imgUrl" />
    <card-game-title v-if="game" :game="game" :type="type" />
    <card-game-details v-if="game" :game="game" :type="type" />
    <div class="pa-3" v-if="type === 'long'">
      <v-divider class="mt-3"></v-divider>
      <div class="mt-3" v-if="type === 'long'">
        <b class="text-capitalize">Event Organizer</b><br>
        <router-link :to="`/players/${creator.id}`">
          <card-organizer  :creator="creator"  />
        </router-link>
      </div>
      <v-divider class="mt-3"></v-divider>
      <div class="mt-3">
        <b class="text-capitalize">About the event</b><br>
        <div v-html="game.desc" class="pa-3"></div>
      </div>
    </div>

  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment'
  import CardOrganizer from "./card-partials/GameOrganizer";
  import CardGameTitle from "./card-partials/GameSubtitle";
  import CardGameDetails from "./card-partials/GameDetails";
  import CardGameImage from "./card-partials/CardGameImage";
  export default {
    name: "AppCard",
    props: ['game', 'type', 'creatorTitle'],
    components:{ CardOrganizer, CardGameTitle, CardGameDetails, CardGameImage },
    computed:{
      ...mapGetters(['playerById']),
      getTime(){
        return moment(this.game.time, 'h:mm').format('hh:mm A')
      },
      isFilled(){
        return +this.game.spots - this.goingPlayers.length === 0
      },
      creator(){
        return this.game.creatorId ? this.playerById(this.game.creatorId) : null
      },
      isCanceled(){
        return this.game.status === 'canceled'
      },
      isRouter(){
        return this.type === 'short' ? `/game/${this.game.id}`: ''
      },
    },
    methods:{
      navigate(e) {
        if(this.type === 'short'){
          return e.target.parentElement.getAttribute('id') === 'organizer'
            ? this.$router.push(`/user/${this.creator.id}`)
            : null
        }else {
          e.target.removeEventListener('click', this.navigate)
        }

      }
    },
    async mounted() {
      if(this.creator == null){
        await this.$store.dispatch('fetchPlayers')
      }
    }
  }
</script>

<style scoped>

</style>
