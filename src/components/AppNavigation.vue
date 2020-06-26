<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Soccer mates</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-for="link in links"
      :key="link.title"
      :to="link.path"
      text>
        {{ link.title }}
    </v-btn>
    <v-btn v-if="info" text @click="signOut">Sign Out</v-btn>
    <v-btn v-else text to="signin">Sign In</v-btn>

  </v-app-bar>
</template>

<script>
  export default {
    name: "Navigation",
    data(){
      return{
        links: [
          { title: 'Games', path: '/' },
          { title: 'Create Game', path: '/create-game' },
          { title: 'Profile', path: '/profile' },
        ]
      }
    },
    computed:{
      info(){
        return this.$store.getters.info
      }
    },
    methods:{
      async signOut(){
        await this.$store.dispatch('signOut');
        await this.$router.push('/signin')
      }
    }
  }
</script>

<style scoped>

</style>
