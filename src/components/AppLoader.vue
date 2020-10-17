<template>
  <v-layout row justify-center>
    <v-progress-circular
      indeterminate
      :color="color"
      :large="large"
    ></v-progress-circular>
  </v-layout>
</template>
<script>
export default {
  name: 'AppLoader',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    large: {
      type: Boolean,
      default: true
    }
  }
}
</script>
