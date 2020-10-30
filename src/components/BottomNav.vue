<template>
  <v-bottom-navigation v-if="show"
    app
    v-model="bottomNav"
    color="white"
    shift
    background-color="primary"
    grow>
    <v-btn v-for="(l, i) in links" :key="i" :to="l.route">
      <span>{{ l.title }}</span>
      <v-icon color="#f1f1f1">{{ l.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomNav',
  data () {
    return {
      show: true,
      bottomNav: null,
      links: [
        { route: '/my-games', icon: 'mdi-calendar', title: 'My games' },
        { route: '/players', icon: 'mdi-account-group', title: 'Crew' },
        { route: '/', icon: 'mdi-soccer', title: 'Games' },
        { route: '/messages', icon: 'mdi-message', title: 'Messages' },
        { route: '/profile', icon: 'mdi-account', title: 'Profile' }
      ]
    }
  },
  mounted () {
    this.bottomNav = this.links.findIndex(l => l.route === this.$route.path)
  }

}
</script>
