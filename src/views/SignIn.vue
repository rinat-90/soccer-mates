<template>
  <div class="d-flex justify-center" style="height: 100vh">
    <v-card width="450" class="align-self-center" style="opacity: 0.95;">
      <v-card-title>
        <div class="display-1 mx-auto">Sign In</div>
      </v-card-title>
      <v-card-text>
        <signin-form />
        <div class="text-center mt-3 text-decoration-underline">Forgot password?</div>
        <div class="mt-1 text-center">Don't have an account? <router-link to="/register">Register</router-link> </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  import SigninForm from "../components/Forms/SigninForm";
  export default {
    name: 'SignIn',
    components: { SigninForm },
    computed:{
      user(){
        return this.$store.getters.user
      }
    },
    watch:{
      user(val){
        if(val){
          this.$router.push('/')
        }
      }
    }

  }
</script>
