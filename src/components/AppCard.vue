<template>
  <v-card :to="`/game/${game.id}`">
    <v-card-title class="py-2" v-if="creatorTitle">
      <v-avatar size="35" class="mr-2 white--text" color="primary">
        <img v-if="creator.imgUrl !== ''" :src="creator.imgUrl" alt="John">
        <span v-else >{{ initials }}</span>
      </v-avatar>
      <span v-if="creator" style="font-size: 18px;">{{ creator.displayName }}</span>
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
        <span class="ml-2">{{ game.address }}</span>
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
    props: ['game', 'type', 'creatorTitle'],
    computed:{
      ...mapGetters(['playerById']),
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
      isFilled(){
        return +this.game.spots - this.goingPlayers.length === 0
      },
      creator(){
        return this.game.creatorId ? this.playerById(this.game.creatorId) : null
      },
      initials(){
        const names = this.creator ? this.creator.displayName.split(' ') : this.creator.displayName;
        let initials = '';
        if(names.length > 1){
          return `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`
        }else{
          return`${names[0].charAt(0).toUpperCase()}`
        }
      },
      isCanceled(){
        return this.game.status === 'canceled'
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
