<template>
  <v-avatar :left="left" :right="right" :size="size" :class="styles" :color="color">
    <img v-if="imgUrl" :src="imgUrl" :alt="imgUrl">
    <span v-else><v-icon dark>{{ icon }}</v-icon></span>
  </v-avatar>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    imgUrl: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '35'
    },
    styles: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: 'mdi-account'
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
