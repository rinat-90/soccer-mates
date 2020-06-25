<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Soccer mates</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },

  data: () => ({
    //
  })
}
</script>
