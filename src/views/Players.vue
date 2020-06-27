<template>
  <div>this is players page</div>
</template>

<script>
  export default {
    name: "Players",
    async mounted(){
      if(!this.$store.getters.players.length){
        await this.$store.dispatch('fetchPlayers')
      }
    }
  }
</script>

<style scoped>

</style>
