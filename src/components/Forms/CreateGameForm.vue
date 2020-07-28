<template>
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="game.title" label="Title" :rules="rules.title"></v-text-field>
    <vuetify-google-autocomplete
      v-model="game.address"
      ref="address"
      id="map"
      :label="'Address'"
      :rules="rules.address"
      :placechanged="setPlace"
    >
    </vuetify-google-autocomplete>
    <v-text-field v-model="game.date" type="date" label="Date" :rules="rules.date"></v-text-field>
    <v-text-field v-model="game.time" type="time" label="Time" :rules="rules.time"></v-text-field>
    <v-text-field v-model="game.spots" type="number" label="Spots" :rules="rules.spots"></v-text-field>
    <v-select v-model="game.skillLevel" :items="skills" label="Skill Level"></v-select>
    <v-file-input v-if="type !== 'edit'" v-model="image" chip></v-file-input>
<!--    <v-text-field readonly @click="onPickFile" v-model="game.imgUrl" label="Image" :rules="rules.imgUrl"></v-text-field>-->
    <input
      @change="onFilePicked"
      ref="fileInput"
      accept="image/*"
      type="file"
      style="display: none" />
    <v-card v-if="type !== 'edit'" color="primary lighten-4" flat class="d-flex justify-center mx-auto" max-width="500" height="180">
      <div v-if="!imgUrl" class="align-self-center text-center">
        <v-btn  @click="onPickFile" x-large icon color="primary" >
          <v-icon>mdi-camera</v-icon>
        </v-btn>
        <p>Upload your image</p>
      </div>
      <v-img v-else :src="imgUrl" height="180"></v-img>
    </v-card>
    <v-subheader>Game description</v-subheader>
    <text-editor :desc="game.desc" @input="(newDesc) => { game.desc = newDesc }" />

    <v-select v-if="type === 'edit'" v-model="game.status" :value="game.status" :items="['scheduled','canceled']" label="Game status"></v-select>

    <div class="d-flex">
      <v-spacer></v-spacer>
      <v-btn v-if="type === 'edit'" class="mr-2"  @click="$emit('onClose')">Close</v-btn>
      <v-btn v-if="type === 'edit'" color="primary" :disabled="!valid" :loading="loading" @click="updateGame">Update</v-btn>
      <v-btn v-else color="primary" :disabled="!valid" :loading="loading" @click="createGame">Create</v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
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
        spots: 2,
        skillLevel: 'All Skills Level'
      },
      image: null,
      imgUrl: '',
      rules: {
        title: [
          v => !!v || 'Title is required',
          v => (v && v.length <= 50) || 'Display name must be less than 30 characters'
        ],
        address: [
          v => !!v || 'Location is required'
        ],
        desc: [
          v => !!v || 'Description is required'
        ],
        imgUrl: [
          v => !!v || 'Image Url is required'
        ],
        date: [
          v => !!v || 'Pick a date',
          v => v >= moment().format('YYYY-MM-DD') || 'Date must be valid'
        ],
        time: [
          v => !!v || 'Pick a time'
        ],
        spots: [
          v => !!v || 'This field required',
          v => this.validateSpots(v) || 'Unable to set spot number less than number of joined players'
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['error', 'loading', 'gameById']),
    game () {
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
    goingPlayers () {
      return this.game ? Object.values(this.game.going) : []
    }
  },
  methods: {
    validateSpots (v) {
      const going = this.goingPlayers.length
      if (this.type === 'edit' && going > 0) {
        if (going <= +v) {
          return true
        }
      } else if (this.type === 'new-game') {
        if (v > 1) {
          return true
        }
      }
    },
    async createGame () {
      if (this.$refs.form.validate() && this.game.desc !== '') {
        const key = await this.$store.dispatch('createGame', { ...this.game, image: this.image })
        await this.$refs.form.reset()
        await this.$router.push(`/game/${key}`)
      }
    },
    async updateGame () {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('updateGame', this.game)
        this.$emit('onInput', 'update')
        console.log(this.game)
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
    // onFilePicked (e) {
    //   const files = e.target.files
    //   const fileName = files[0].name
    //   // console.log(files[0]);
    //   if (fileName.lastIndexOf('.') <= 0) {
    //     return alert('Please add proper file')
    //   }
    //   const fileReader = new FileReader()
    //   fileReader.addEventListener('load', () => {
    //     this.imgUrl = fileReader.result
    //   })
    //   fileReader.readAsDataURL(files[0])
    //   this.image = files[0]
    // }
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
    // if (this.type === 'edit') {
    //   this.game = this.gameById(this.$route.params.id)
    // }
  },
  watch: {
    image (val) {
      if (val) {
        this.onFilePicked(val)
        console.log(val)
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
