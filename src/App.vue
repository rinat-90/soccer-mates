<template>
  <v-app>
    <v-main>
      <component :is="layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script>
import MainLayout from "./layouts/Main";
import EmptyLayout from "./layouts/Empty";

export default {
  name: 'App',
  components: { MainLayout, EmptyLayout },
  data: () => ({
    //
  }),
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
}
</script>
