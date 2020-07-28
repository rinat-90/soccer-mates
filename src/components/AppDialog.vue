<template>
  <v-dialog
    :value="dialog"
    width="800"
    @click:outside="$emit('onClose')">
    <v-card>
      <v-toolbar dark color="primary">
        <span>{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('onClose')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-5">
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
