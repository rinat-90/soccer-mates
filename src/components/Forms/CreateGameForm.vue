<template>
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="game.title" label="Title" :rules="rules.title" prepend-icon="mdi-format-text"></v-text-field>
    <vuetify-google-autocomplete
      v-model="game.address"
      ref="address"
      id="map"
      label="Location"
      placeholder=""
      :rules="rules.address"
      prepend-icon="mdi-map-marker-outline"
      :placechanged="setPlace"
    >
    </vuetify-google-autocomplete>
    <v-text-field v-model="game.date" prepend-icon="mdi-calendar-outline" type="date" label="Date" :rules="rules.date"></v-text-field>
    <v-text-field v-model="game.time" prepend-icon="mdi-clock-time-eight-outline" type="time" label="Time" :rules="rules.time"></v-text-field>
<!--    <v-text-field v-model="game.spots" prepend-icon="mdi-account-group-outline" type="number" label="Spots" :rules="rules.spots"></v-text-field>-->
    <v-select label="Spots" v-model="game.spots" :value="game.spots" :items="spotOptions"  prepend-icon="mdi-account-group-outline"></v-select>
    <v-select label="Skill Level" v-model="game.skillLevel"  :value="game.skillLevel" :items="skills" :rules="rules.skillLevel" prepend-icon="mdi-cog-outline"></v-select>
    <v-file-input label="Choose Image" v-if="type !== 'edit'" v-model="image" :rules="rules.img" accept="image/*" chips @click:clear="imgUrl = ''"></v-file-input>
    <v-expand-transition>
      <v-card v-if="type !== 'edit' && imgUrl" color="primary lighten-4" flat class="d-flex justify-center mx-auto" max-width="500" height="180">
        <v-img :src="imgUrl" height="180"></v-img>
      </v-card>
    </v-expand-transition>
    <v-subheader>Game description</v-subheader>
    <text-editor :desc="game.desc" @input="(newDesc) => { game.desc = newDesc }" />
    <v-select v-if="type === 'edit'" v-model="game.status" :value="game.status" :items="['scheduled','canceled']" label="Game status"></v-select>
    <div class="d-flex">
      <v-spacer></v-spacer>
      <v-btn v-if="type === 'edit'" class="mr-2"  @click="$emit('onClose')">Close</v-btn>
      <v-btn v-if="type === 'edit'" color="primary" :disabled="!valid" :loading="loading" @click="updateGame($route.params.id)">Update</v-btn>
      <v-btn v-else color="primary" :disabled="!valid" :loading="loading" @click="createGame">Create</v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import TextEditor from '../TextEditor'
export default {
  name: 'CreateGameForm',
  components: { TextEditor },
  props: ['type'],
  data () {
    return {
      valid: false,
      skills: ['All skills level', 'Beginner', 'Intermediate', 'Advanced'],
      statuses: ['scheduled', 'canceled', 'postponed'],
      newGame: {
        title: '',
        location: '',
        address: '',
        date: moment().format('YYYY-MM-DD'),
        time: null,
        desc: '',
        spots: 1,
        skillLevel: ''
      },
      image: null,
      imgUrl: '',
      rules: {
        title: [
          v => !!v || 'Title is required',
          v => (v && v.length <= 50) || 'Title must be less than 30 characters'
        ],
        address: [
          v => !!v || 'Location is required'
        ],
        desc: [
          v => !!v || 'Description is required'
        ],
        date: [
          v => !!v || 'Pick a date',
          v => v >= moment().format('YYYY-MM-DD') || 'Date must be valid'
        ],
        time: [
          v => !!v || 'Pick a time'
        ],
        img: [
          v => !!v || 'Please add a thumbnail picture'
        ],
        skillLevel: [
          v => !!v || 'Please choose skill level of the game'
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['error', 'loading', 'gameById']),
    spotOptions () {
      const values = []
      let i = 0
      if (this.type === 'edit') {
        i = this.game.going.length - 1
      }
      for (i; i < 100; i++) {
        values.push((i + 1))
      }
      return values
    },
    game: {
      get () {
        if (this.type === 'edit') {
          return {
            ...this.gameById(this.$route.params.id)
          }
        } else {
          return {
            ...this.newGame
          }
        }
      },
      set (game) {
        return game
      }
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnack']),
    async createGame () {
      if (this.game.desc !== '' && this.$refs.form.validate()) {
        const id = await this.$store.dispatch('createGame', { ...this.game, image: this.image })
        await this.$refs.form.reset()
        await this.$router.push(`/game/${id}`)
        await this.showSnack({
          text: 'Game successfully created!',
          color: 'primary',
          timeout: 3500
        })
      }
    },
    async updateGame (id) {
      if (this.$refs.form.validate()) {
        const { creator, going, ...rest } = this.game
        await this.$store.dispatch('updateGame', { ...rest, id })
        this.$emit('onClose')
        await this.showSnack({
          text: ' Game successfully updated!',
          color: 'primary',
          timeout: 3500
        })
      }
    },
    async cancelGame () {
      await this.$store.dispatch('cancelGame', this.game.id)
      this.$emit('onInput', 'cancel-game')
    },
    setPlace (addressData, placeResultData, id) {
      this.game.location = addressData
      console.log('address data', addressData)
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (file) {
      const fileName = file.name
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Please add proper file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imgUrl = fileReader.result
      })
      fileReader.readAsDataURL(file)
    }
  },
  mounted () {
    if (this.type === 'edit') {
      this.game = this.gameById(this.$route.params.id)
    }
  },
  watch: {
    image (val) {
      if (val) {
        this.onFilePicked(val)
      }
    }
  }
}
</script>

<style scoped>

  .form-control {
    border-radius: 0;
    border-bottom: 1px solid #828282;
    height: 40px;
    width: 100%;
    outline: none;
    margin-bottom: 30px;
  }

</style>
