<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Soccer mates</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
}
</script>
