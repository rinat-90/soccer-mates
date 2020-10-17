<template>
  <v-sheet v-if="roaster.length" class="mx-auto">
    <v-slide-group multiple show-arrows>
      <v-slide-item v-for="(item, i) in roaster" :key="i">
        <v-chip
          pill
          class="mx-2"
          :to="getRoute(item.userId)"
        >
          <app-avatar left :img-url="item.imgUrl" />
          {{ $store.getters.info.userId === item.userId ?  'You' : item.displayName }}
        </v-chip>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: 'GameRoaster',
  props: {
    roaster: {
      type: Array
    }
  },
  methods: {
    getRoute (id) {
      return this.$store.getters.info.userId !== id ? `/player/${id}` : '/profile'
    }
  }
}
</script>

<style scoped>

</style>
