<template>
  <v-dialog :value="dialog" width="600" @click:outside="$emit('onClose')">
    <v-card>
      <v-toolbar dark color="primary">
        <span>{{ title }}</span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppDialog',
  props: {
    dialog: {
      required: true,
      type: Boolean
    },
    title: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
