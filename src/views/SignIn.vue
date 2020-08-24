<template>
  <div>
    <top-bar title="SIGN IN" with-actions>
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
          <div class="d-flex justify-center">
            <v-card width="100%" flat class="align-self-center">
              <div class="text-center my-3">
                <div>
                  <v-avatar tile size="50">
                    <img src="../assets/logo-icon.png" alt="">
                  </v-avatar>
                </div>
                <div>
                  <span class="headline font-weight-bold">SOCCER CREW</span>
                </div>
              </div>
              <v-card-text>
                <signin-form />
                <div class="text-center mt-3 text-decoration-underline">Forgot password?</div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import SigninForm from '../components/Forms/SigninForm'
export default {
  name: 'SignIn',
  components: { SigninForm },
  metaInfo () {
    return {
      title: this.$title('Sign in')
    }
  },

}
</script>
