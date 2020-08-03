<template>
  <div name="snackbars">
    <v-snackbar v-model="show" :color="color" :timeout="timeout" :bottom="'bottom'" :right="'right'">
      <v-icon left v-if="color === 'primary'" >mdi-check-circle</v-icon>
      <v-icon left v-if="color === 'red'" >mdi-alert</v-icon>
      {{ text }}
      <template #action="{ attrs }">
        <v-btn dark small text v-bind="attrs" @click="show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: 'AppToast',
  data () {
    return {
      show: false,
      color: '',
      text: '',
      timeout: -1
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/SHOW_MESSAGE') {
        this.text = state.snackbar.text
        this.color = state.snackbar.color
        this.timeout = state.snackbar.timeout
        this.show = true
      }
    })
  }
}
</script>

<style scoped>

</style>
