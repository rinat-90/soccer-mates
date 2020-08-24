<template>
  <div>
    <top-bar title="CREATE ACCOUNT" with-actions>
      <template #left-actions>
        <v-btn icon to="/signin">
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </template>
      <template #right-actions>
        <v-btn icon to="/register">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </template>
    </top-bar>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card flat class="align-self-center">
            <v-card-text>
              <register-form />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
