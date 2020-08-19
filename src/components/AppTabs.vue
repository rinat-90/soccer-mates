<template>
  <v-tabs
    v-model="tab"
    background-color="primary lighten-1"
    class="elevation-2"
    dark
    centered="centered"
  >
    <v-tabs-slider></v-tabs-slider>

    <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#tab-${tab}`">
      {{ tab }}
    </v-tab>

    <v-tab-item v-for="(tab, i) in tabs" :key="i" :value="'tab-' + tab">
      <v-card flat tile>
        <v-card-text>
          <slot :name="tab"></slot>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  name: 'App-Tabs',
  props: {
    tabs: {
      type: Array
    }
  },
  data () {
    return {
      tab: null
    }
  }
}
</script>

<style scoped>

</style>
