<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex justify-space-between" style="width: 100%;">
      <div class="">
        <slot name="left-actions"></slot>
      </div>
      <div class="">
        <slot name="title"></slot>
      </div>
      <div class="">
        <slot name="left-actions"></slot>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopBar",
  props: {

  }
}
</script>

<style scoped>

</style>
