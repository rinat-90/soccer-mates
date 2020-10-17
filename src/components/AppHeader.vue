<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex justify-space-between align-center" style="width: 100%;">
      <div class="">
        <div v-if="title !== ''">
          <v-btn v-if="back" @click="goBack" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <slot v-else name="left-actions"></slot>
        </div>
        <v-skeleton-loader v-else type="avatar" />
      </div>
      <div class="overflow-hidden" style="min-width: 100px">
        <v-toolbar-title>
          <span v-if="title !== ''">{{ title }}</span>
          <v-skeleton-loader v-else type="text" width="100%"  />
        </v-toolbar-title>
      </div>
      <div class="">
        <slot v-if="title !== ''" name="right-actions"></slot>
        <v-skeleton-loader v-else type="avatar" />
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    back: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
