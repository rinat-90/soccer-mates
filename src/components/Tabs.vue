<template>
  <v-tabs
    v-model="tab"
    fixed-tabs
    background-color="white"
    color="primary"
    dark
    centered>
    <v-tabs-slider></v-tabs-slider>

    <v-tab
      v-for="(tab, i) in tabItems"
      :key="i"
      :disabled="tab === 'chat' && !canChat"
      :href="`#tab-${i}`"
      class="green--text"
      >
      {{ tab }}
    </v-tab>

    <v-tab-item
      v-for="(tab, i) in tabItems"
      :key="i"
      :value="'tab-' + i">
      <v-card flat tile :height="height" class="overflow-y-auto mt-1">
        <v-card-text>
          <slot :name="tab"></slot>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabItems: {
      type: Array,
      required: true
    },
    height: {
      type: String
    },
    canChat: {
      type: Boolean,
      default: false
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
