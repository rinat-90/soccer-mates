<template>
  <div class="d-flex justify-center" style="height: 100vh; opacity: .8">
    <v-card width="450" class="align-self-center">
      <v-card-title>
        <div class="display-1 mx-auto">Register</div>
      </v-card-title>
      <v-card-text>
        <register-form />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import RegisterForm from '../components/Forms/RegisterForm'
export default {
  name: 'Register',
  components: { RegisterForm },
  metaInfo () {
    return {
      title: this.$title('Register')
    }
  },
}
</script>

<style scoped>

</style>
