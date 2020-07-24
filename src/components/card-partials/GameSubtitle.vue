<template>
  <div class="d-flex">
    <div v-if="subtitle">{{ subtitle }}</div>
    <v-spacer></v-spacer>
    <v-chip v-if="status === 'canceled'" small outlined color="red">{{ status }}</v-chip>
  </div>
</template>

<script>
  export default {
    name: "GameTitle",
    props: ['subtitle', 'status']
  }
</script>

<style scoped>

</style>
