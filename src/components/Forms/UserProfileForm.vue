<template>
  <v-form v-model="valid" ref="form" v-if="info">
    <v-text-field v-model="userData.displayName" label="Display Name"></v-text-field>
    <v-text-field v-model="userData.email" label="Email"></v-text-field>
    <v-select
      v-model="userData.positions"
      :items="positions"
      color="primary"
      :value="userData.positions"
      @change="onChange"
      attach
      chips
      label="Game Position"
      multiple
    ></v-select>
    <v-btn @click="updateUserInfo" :disabled="!valid" color="primary">Update</v-btn>
    <v-btn class="ml-2" @click="onClose">Close</v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserProfileForm',
  data () {
    return {
      valid: false,
      position: 'Any',
      positions: ['Any', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Striker'],
      rules: {
        displayName: [
          v => !!v || 'Display name is required',
          v => (v && v.length <= 30) || 'Display name must be less than 30 characters'
        ],
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
      }
    }
  },
  computed: {
    ...mapGetters(['info']),
    userData () {
      if (this.info.positions !== undefined) {
        return {
          ...this.info
        }
      } else {
        return {
          ...this.info,
          positions: ['Any']
        }
      }
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnack']),
    onChange (item) {
      // console.log(item)
    },
    onClose () {
      this.$emit('onClose')
    },
    async updateUserInfo () {
      if (this.$refs.form.validate()) {
        if (this.userData.positions.length > 1) {
          this.userData.positions = this.userData.positions.filter(p => p !== 'Any')
        }
        await this.$store.dispatch('updateUserInfo', this.userData)
        this.onClose()
        await this.showSnack({
          text: 'Profile info successfully updated!',
          color: 'primary',
          timeout: 3500
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
