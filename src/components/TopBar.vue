<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title v-if="title && !withActions" class="mx-auto"><b>{{ title }}</b></v-toolbar-title>
    <div v-if="title && withActions" class="d-flex justify-space-between align-center" style="width: 100%;">
      <div class="">
        <v-btn v-if="withBackBtn" icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <slot v-else name="left-actions"></slot>
      </div>
      <div class="overflow-hidden">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </div>
      <div class="">
        <slot name="right-actions"></slot>
      </div>
    </div>
    <slot v-if="withComponent" name="component"></slot>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    title: {
      type: String
    },
    withActions: {
      type: Boolean,
      default: false
    },
    withComponent: {
      type: Boolean,
      default: false
    },
    withBackBtn: {
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>
