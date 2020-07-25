<template>
  <div v-if="imgUrl">
    <v-img v-if="imgUrl && type === 'short'" :src="imgUrl" height="200px" />
    <v-img v-if="imgUrl && type === 'long'" :src="imgUrl" :height="width < 950 ? '200px' : '350px'" />
  </div>
</template>

<script>
export default {
  name: 'CardGameImage',
  props: {
    imgUrl: {
      type: String
    },
    type: {
      type: String
    }
  },
  computed: {
    width () {
      return window.innerWidth
    }
  }
}
</script>

<style scoped>

</style>
