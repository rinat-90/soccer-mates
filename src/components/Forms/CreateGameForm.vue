<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      v-model="game.title"
      :rules="rules.title"
      label="Title"
      type="text"
      append-icon="mdi-format-text"
      filled>
    </v-text-field>
    <vuetify-google-autocomplete
      v-model="game.address"
      :rules="rules.address"
      :placechanged="setPlace"
      label="Location"
      ref="address"
      id="map"
      placeholder=""
      append-icon="mdi-map-marker-outline"
      filled>
    </vuetify-google-autocomplete>
<!--    date-->
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="game.date"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="game.date"
          :rules="rules.date"
          label="Date"
          append-icon="mdi-calendar-outline"
          v-bind="attrs"
          v-on="on"
          readonly
          filled
        ></v-text-field>
      </template>
      <v-date-picker v-model="game.date" no-title scrollable color="primary" header-color="primary">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(game.date)">OK</v-btn>
      </v-date-picker>
    </v-menu>
<!--    start time-->
    <v-menu
      ref="menu2"
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="game.time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="game.startTime"
          :rules="rules.startTime"
          label="Start Time"
          append-icon="mdi-clock-time-eight-outline"
          v-bind="attrs"
          v-on="on"
          readonly
          filled
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu2"
        format="ampm"
        v-model="game.startTime"
        color="primary"
        full-width
        @click:minute="$refs.menu2.save(game.startTime)"
      ></v-time-picker>
    </v-menu>
<!--    end time-->
    <v-menu
      ref="menu3"
      v-model="menu3"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="game.time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="game.endTime"
          :rules="rules.endTime"
          label="End Time"
          append-icon="mdi-clock-time-eight-outline"
          v-bind="attrs"
          v-on="on"
          readonly
          filled
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu3"
        format="ampm"
        v-model="game.endTime"
        color="primary"
        full-width
        @click:minute="$refs.menu3.save(game.endTime)"
      ></v-time-picker>
    </v-menu>
    <v-select
      v-model="game.spots"
      :value="game.spots"
      :items="spotOptions"
      label="Spots"
      append-icon="mdi-account-group-outline"
      filled>
    </v-select>
    <v-select
      v-model="game.skillLevel"
      :value="game.skillLevel"
      :items="skills"
      :rules="rules.skillLevel"
      label="Skill Level"
      append-icon="mdi-cog-outline"
      filled>
    </v-select>
    <v-file-input
      v-if="type !== 'edit-game'"
      v-model="image"
      @click:clear="imgUrl = ''"
      :rules="rules.img" accept="image/*"
      label="Choose Image"
      prepend-icon=""
      append-icon="mdi-attachment"
      filled
      chips>
    </v-file-input>
    <v-expand-transition>
      <v-card
        v-if="type !== 'edit-game' && imgUrl"
        color="primary lighten-4"
        class="d-flex justify-center mx-auto mb-3"
        max-width="500"
        height="180"
        flat>
        <v-img :src="imgUrl" height="180"></v-img>
      </v-card>
    </v-expand-transition>
    <v-textarea
      v-model="game.desc"
      :rules="rules.desc"
      label="About the game"
      append-icon="mdi-information-outline"
      filled>
    </v-textarea>
    <v-bottom-navigation app color="white" dark background-color="primary">
      <v-btn
        v-if="type === 'new-game'"
        @click="createGame"
        :disabled="!valid"
        :loading="loading"
        color="primary"
        block>
        Create
      </v-btn>
      <v-btn
        v-else
        @click="updateGame(game.id)"
        :disabled="!valid"
        :loading="loading"
        color="primary"
        block>
        Update
      </v-btn>
    </v-bottom-navigation>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import dateFilter from "@/filters/dateFilter";
export default {
  name: 'CreateGameForm',
  props: ['type', 'gameData'],
  data () {
    return {
      menu: false,
      menu2: false,
      menu3: false,
      valid: false,
      skills: ['All skills level', 'Beginner', 'Intermediate', 'Advanced'],
      statuses: ['scheduled', 'canceled', 'postponed'],
      newGame: {
        title: '',
        location: '',
        address: '',
        date: moment().format('YYYY-MM-DD'),
        startTime: '',
        endTime: '',
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
        startTime: [
          v => !!v || 'Pick a time'
        ],
        endTime: [
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
    ...mapGetters(['error', 'loading']),
    formattedDate () {
      return dateFilter(this.game.date)
    },
    spotOptions () {
      const values = []
      let i = 0
      if (this.type === 'edit') {
        i = this.game.roaster.length || 0
      }
      for (i; i < 100; i++) {
        values.push((i + 1))
      }
      return values
    },
    game: {
      get () {
        if (this.type === 'edit-game') {
          return {
            ...this.gameData
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
      if (this.$refs.form.validate()) {
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
        const { roaster, creator, ...rest } = this.game
        await this.$store.dispatch('updateGame', rest)
        await this.$router.push(`/game/${id}`)
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
