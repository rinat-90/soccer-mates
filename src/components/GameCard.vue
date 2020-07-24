<template>
  <v-card :to="isRouter">
    <div v-if="type === 'short'">
      <slot
        v-if="creator"
        name="organizer"
        :creator="creator" />
    </div>
    <div>
      <slot
        name="image"
        :size="size"
        :img-url="game.imgUrl" />
    </div>
    <v-card-title>{{ game.title }}</v-card-title>
    <v-card-subtitle>
      <slot
        name="subtitle"
        :subtitle="subtitle"
        :status="game.status" />
    </v-card-subtitle>
    <v-card-text>
      <slot
        name="gameDetails"
        :address="game.address"
        :skill="game.skillLevel"
        :date="game.date"
        :time="game.time" />
    </v-card-text>
    <v-card-text v-if="type === 'long'">
      <slot
        name="gameInfo"
        :game="game"
        :creator="creator"
        :roaster.sync="roaster"
        :subtitle.sync="spots" />
    </v-card-text>
    <v-card-actions v-if="type === 'long'">
      <slot
        name="gameActions"
        :is-creator.sync="isCreator"
        :is-canceled.sync="isCanceled"
        :is-filled.sync="isFilled"
        :is-finished.sync="isFinished"
        :is-going.sync="isGoing"
        :join.sync="join"
        :unjoin.sync="unjoin"/>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "GameCard",
    props: ['game', 'type'],
    computed:{
      ...mapGetters(['playerById', 'gameById', 'info']),
      theGame(){
        return this.gameById(this.game.id) || null
      },
      roaster(){
        return this.goingPlayers.length ? this.goingPlayers.map(item => this.playerById(item)['displayName']) : []
      },
      creator(){
        return this.game.creatorId ? this.playerById(this.game.creatorId) : null
      },
      width(){
        return window.innerWidth;
      },
      size(){
        return this.type === 'long'
          ? this.width < 950 ? '200px' : '350px'
          : '200px'
      },
      spots(){
        return !this.goingPlayers.length
          ? `${this.game.spots} spots left`
          : this.isFilled
            ? `${this.game.spots} going, All spots filled`
            : `${this.goingPlayers.length } going,  ${(+this.game.spots - this.goingPlayers.length )} spots left`
      },
      isCanceled(){
        return this.game.status === 'canceled'
      },
      isGoing(){
        return this.goingPlayers.length ? this.goingPlayers.find(g => g === this.info.userId) : false
      },
      isFilled(){
        return +this.game.spots - this.goingPlayers.length === 0
      },
      isFinished(){
        return this.game.status === 'finished'
      },
      isCreator(){
        return this.creator.id === this.info.userId
      },
      goingPlayers(){
        return Object.values(this.game.going)
      },
      subtitle(){
        return this.type === 'short' ? this.spots : this.game.date
      },
      isRouter(){
        return this.type === 'short' ? `/game/${this.game.id}`: ''
      },
    },
    async mounted() {
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
    }
  }
</script>

<style scoped>

</style>
