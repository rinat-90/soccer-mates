<template>
  <div class="d-flex justify-center" style="height: 100vh">
    <v-card width="450" class="align-self-center" style="opacity: 0.8;">
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
        <signin-form />
        <div class="text-center mt-3 text-decoration-underline">Forgot password?</div>
        <div class="mt-1 text-center">Don't have an account? <router-link to="/register">Register</router-link> </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import SigninForm from "../components/Forms/SigninForm";
  import messages from "../utils/messages";
  export default {
    name: 'SignIn',
    components: { SigninForm },



  }
</script>
