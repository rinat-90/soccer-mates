<template>
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="newUser.displayName" label="Display Name" :rules="rules.displayName"></v-text-field>
    <v-text-field v-model="newUser.email" label="Email" :rules="rules.email"></v-text-field>
    <v-text-field v-model="newUser.password" type="password" label="Password" :rules="rules.password"></v-text-field>
    <v-text-field v-model="newUser.confirmedPassword" type="password" label="Confirm Password" :rules="rules.confirmPassword"></v-text-field>
    <v-btn :loading="loading" :disabled="!valid" color="primary" @click="register">Register</v-btn>
    <div class="mt-4 text-center">Already have an account? <router-link to="/signin">Sign in</router-link> </div>
  </v-form>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "RegisterForm",
    data(){
      return{
        valid: false,
        newUser:{
          displayName: '',
          email: '',
          password: '',
          confirmedPassword: ''
        },
        rules:{
          displayName: [
            v => !!v || 'Display name is required',
            v => (v && v.length <= 30) || 'Display name must be less than 30 characters'
          ],
          email: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          password: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters'
          ],
          confirmPassword: [
            v => !!v || 'Password confirm is required',
            v => (v && v === this.newUser.password) || 'Password does not match',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters'
          ],
          checkbox:[
            v => !!v || 'You must agree to continue'
          ]
        },
      }
    },
    computed:{
      ...mapGetters(['error', 'loading'])
    },
    methods: {
      async register() {
        if(this.$refs.form.validate()){
          const { confirmedPassword, ...userData } = this.newUser;
          console.log(userData)
          await this.$store.dispatch('register',userData);
          await this.$router.push('/signin')
        }
      }
    }
  }
</script>

<style scoped>

</style>
