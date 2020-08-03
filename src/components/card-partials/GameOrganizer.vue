<template>
  <v-card-title id="organizer" class="py-2">
    <v-avatar size="35" class="mr-2 white--text" color="primary">
      <img v-if="imgUrl" :src="imgUrl" :alt="name">
      <span v-else><v-icon dark>mdi-account</v-icon></span>
    </v-avatar>
    <span v-if="name" style="font-size: 18px;">{{ name }}</span>
  </v-card-title>
</template>
<script>
export default {
  name: 'CardOrganizer',
  props: {
    name: {
      type: String
    },
    imgUrl: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
