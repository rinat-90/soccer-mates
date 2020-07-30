<template>
  <div>
    <app-toast />
    <div ref="bg" class=""></div>
    <v-container class="pa-0">
      <router-view />
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import messages from '../utils/messages'
import AppToast from '../components/AppToast'
export default {
  name: 'Empty',
  components: { AppToast },
  data () {
    return {
      snackbar: false,
      text: ''
    }
  },
  computed: {
    ...mapGetters(['error'])
  },
  methods: {
    ...mapActions('snackbar', ['showSnack'])
  },
  watch: {
    error (val) {
      if (val) {
        this.showSnack({
          text: messages[this.error.code],
          color: 'red',
          timeout: 3500
        })
      }
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.$refs.bg) {
        console.log(this.$refs.bg.className = 'bg')
      }
    }, 500)
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
