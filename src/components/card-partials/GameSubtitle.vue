<template>
  <div class="d-flex">
    <div v-if="subtitle">{{ subtitle }}</div>
    <v-spacer></v-spacer>
    <v-chip v-if="status === 'canceled'" small outlined color="red">{{ upperCaseStatus }}</v-chip>
    <v-chip v-if="status === 'finished'" small outlined color="orange">{{ upperCaseStatus }}</v-chip>
  </div>
</template>

<script>
export default {
  name: 'GameTitle',
  props: ['subtitle', 'status'],
  computed: {
    upperCaseStatus () {
      return this.status.charAt(0).toLocaleUpperCase() + this.status.slice(1)
    }
  }
}
</script>

<style scoped>

</style>
