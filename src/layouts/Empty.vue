<template>
  <div>
    <div ref="bg" class=""></div>
    <v-container class="pa-0">
      <router-view />
    </v-container>

    <app-snackbar
      :snackbar="snackbar"
      :text="text"
      :type="'error'"
      @onDismiss="snackbar = !snackbar" />
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import messages from "../utils/messages";
  export default {
    name: "Empty",
    data(){
      return{
        snackbar: false,
        text: ''
      }
    },
    computed:{
      ...mapGetters(['error']),

    },
    watch:{
      error(val){
        if(val){
          this.text = messages[this.error.code];
          this.snackbar = true
        }
      }
    },
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
