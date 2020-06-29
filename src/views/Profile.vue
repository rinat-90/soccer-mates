<template>
  <div>Profile</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "Profile",
    computed:{
      ...mapGetters(['loading', 'error', 'playerById'])
    }
  }
</script>

<style scoped>

</style>
