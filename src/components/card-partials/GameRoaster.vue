<template>
  <v-sheet v-if="roaster.length" class="mx-auto">
    <v-slide-group multiple show-arrows>
      <v-slide-item v-for="(item, i) in roaster" :key="i">
        <v-chip pill class="mx-2" :to="userId !== item.id ? `/players/${item.id}` : `/profile`">
          <v-avatar left v-if="item.imgUrl">
            <v-img :src="item.imgUrl"></v-img>
          </v-avatar>
          {{ item.displayName }}
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
  computed: {
    userId () {
      return this.$store.getters.info.userId
    }
  },
  data: () => ({
    model: null
  })
}
</script>

<style scoped>

</style>
