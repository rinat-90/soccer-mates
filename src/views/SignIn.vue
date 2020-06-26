<template>
  <v-layout justify-center>
    <v-card width="600">
      <v-card-title>
        <div class="display-1 mx-auto">Sign In</div>
      </v-card-title>
      <v-card-text>
        <signin-form />
      </v-card-text>
    </v-card>
  </v-layout>
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
