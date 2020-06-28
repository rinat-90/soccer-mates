<template>
  <div>
    <div ref="bg" class=""></div>
    <v-container class="pa-0">
      <router-view />
    </v-container>
  </div>
</template>

<script>
  export default {
    name: "Empty",
    mounted() {
      setTimeout(() => {
        if(this.$refs.bg){
          console.log(this.$refs.bg.className = 'bg');
        }
      },500)
    }
  }
</script>

<style scoped>
  .bg{
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-image: url('../assets/bg4.jpg');
    background-position: center center;
    background-size: cover;

  }
</style>
