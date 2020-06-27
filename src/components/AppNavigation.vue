<template>
<div>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="hidden-sm-and-down"><b>SOCCER MATES</b></v-toolbar-title>
    <v-toolbar-title class="hidden-md-and-up">
      {{ $route.name}}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="$route.path !== '/'" class="hidden-md-and-up" text @click="$router.push('/')">
      <v-icon>mdi-chevron-left</v-icon>
      <span>Back</span>
    </v-btn>
    <v-btn
      class="hidden-sm-and-down"
      v-for="link in links"
      :key="link.title"
      :to="link.path"
      text>
      {{ link.title }}
    </v-btn>
    <v-btn class="hidden-sm-and-down" text @click="signOut">Sign Out</v-btn>
  </v-app-bar>
  <v-navigation-drawer
    color="primary lighten-1"
    dark
    v-model="drawer"
    fixed
    temporary
  >
    <v-app-bar color="primary" dark>
      <v-toolbar-title class="mx-auto">
        <b>SOCCER MATES</b>
      </v-toolbar-title>
    </v-app-bar>
<!--    <v-list-item v-if="info">-->
<!--      <v-list-item-avatar>-->
<!--        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>-->
<!--      </v-list-item-avatar>-->

<!--      <v-list-item-content>-->
<!--        <v-list-item-title>{{ info.displayName }}</v-list-item-title>-->
<!--      </v-list-item-content>-->
<!--    </v-list-item>-->

    <v-divider></v-divider>

    <v-list>

      <v-list-item
        v-for="item in links"
        :key="item.title"
        link
        :to="item.path"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="signOut">
        <v-list-item-icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>
  export default {
    name: "Navigation",
    data(){
      return{
        drawer: false,
        links: [
          { title: 'Games', path: '/', icon: 'mdi-soccer'},
          { title: 'Create Game', path: '/create-game', icon: 'mdi-plus' },
          { title: 'Players', path: '/players', icon: 'mdi-account-group' },
          { title: 'Profile', path: '/profile', icon: 'mdi-account' },
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
