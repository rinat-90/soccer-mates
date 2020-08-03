<template>
  <div class="d-flex justify-center" style="height: 100vh; opacity: .8">
    <v-card width="450" class="align-self-center">
      <div class="text-center mt-3">
        <div>
          <v-avatar tile size="70">
            <img src="../assets/logo-icon.png" alt="">
          </v-avatar>
        </div>
        <div>
          <span class="display-1 font-weight-bold" style="color:green;">SOCCER MATES</span>
        </div>
      </div>
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
