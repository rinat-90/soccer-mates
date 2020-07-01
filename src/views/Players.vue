<template>
  <div>
    <div>this is players page</div>
<!--    <pre>{{ players }}</pre>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "Players",
    computed:{
      ...mapGetters(['loading', 'error', 'players'])
    },
    async mounted(){
      if(!this.players.length){
        await this.$store.dispatch('fetchPlayers')
      }
    }
  }
</script>

<style scoped>

</style>
