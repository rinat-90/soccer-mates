<template>
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="user.email" label="Email" :rules="rules.email"></v-text-field>
    <v-text-field v-model="user.password" type="password" label="Password" :rules="rules.password"></v-text-field>
    <div class="d-flex">
      <v-btn :loading="loading" :disabled="!valid" color="primary" @click="signIn">Sign In</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon color="primary">
        <v-icon>mdi-google</v-icon>
      </v-btn>
      <v-btn icon color="primary">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: "SigninForm",
    data(){
      return{
        valid: false,
        user:{
          email: '',
          password: '',
        },
        rules:{
          email: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          password: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters'
          ],
        },
      }
    },
    computed:{
      ...mapGetters(['loading', 'error'])
    },
    methods:{
      //...mapActions(['signIn']),
      async signIn(){
        if(this.$refs.form.validate()){
          console.log(this.user)
          await this.$store.dispatch('signIn', this.user);
          await this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>

</style>
