<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      v-model="user.email"
      :rules="rules.email"
      label="Email"
      append-icon="mdi-account"
      filled>
    </v-text-field>
    <v-text-field
      v-model="user.password"
      :rules="rules.password"
      type="password"
      label="Password"
      append-icon="mdi-lock"
      filled>
    </v-text-field>
    <v-btn :loading="loading" :disabled="!valid" color="primary" @click="signIn" block large>Sign In</v-btn>
    <div class="d-flex my-8 justify-space-around">
      <v-btn color="#f1f1f1">
        <v-icon left>mdi-google</v-icon>
        Google
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue" dark>
        <v-icon>mdi-facebook</v-icon>
        Facebook
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SigninForm',
  data () {
    return {
      valid: false,
      user: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be at least 6 characters'
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['loading', 'error'])
  },
  methods: {
    async signIn () {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('signIn', this.user)
        await this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>
