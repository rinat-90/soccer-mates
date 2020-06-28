<template>
  <v-snackbar
    @input="$emit('onDismiss')"
    v-if="text"
    :value="snackbar"
    :color="snackbarColor"
    :timeout="5000"
    top>
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="$emit('onDismiss')"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    name: "AppSnackbar",
    props: {
      text:{
        type: String,
        required: true
      },
      type:{
        type: String,
        required: true
      },
      snackbar: {
        type: Boolean,
        required: true
      }
    },
    computed:{
      snackbarColor(){
        return this.type === 'success' ? 'primary lighten-1' : 'red lighten-3'
      }
    }
  }
</script>

<style scoped>

</style>
