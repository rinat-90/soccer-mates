<template>
  <v-row>
    <v-col
      sm="12" :md="cols" :lg="cols" cols="12"
      v-for="i in count" :key="i">
      <v-card :color="color" :flat="flat" :width="width">
        <v-skeleton-loader
          :type="typeOptions"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AppSkeletonLoader',
  props: {
    typeOptions: {
      type: String
    },
    count: {
      type: Number
    },
    cols: {
      type: Number,
      default: 4
    },
    color: {
      type: String,
      default: 'grey lighten-2'
    },
    flat: {
      type: Boolean,
      default: false
    },
    width: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
