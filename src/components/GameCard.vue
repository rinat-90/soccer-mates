<template>
  <div>
    <v-card v-if="game != null" :to="isRouter">
      <slot v-if="appBar" name="app-bar" :title="game.title" :is-creator="isCreator"></slot>
      <div v-if="type === 'small'">
        <slot
          name="organizer"
          :creator="creator" />
      </div>
      <div>
        <slot
          name="image"
          :size="size"
          :is-creator="isCreator"
          :on-file-picked-handler="onFilePicked"
          :imgUrl="gameImgUrl" />
      </div>
      <v-card-title>{{ game.title }}</v-card-title>
      <v-card-subtitle>
        <slot
          name="subtitle"
          :subtitle="subtitle"
          :status="game.status" />
      </v-card-subtitle>
      <v-card-text>
        <slot
          name="gameDetails"
          :address="game.address"
          :skill="game.skillLevel"
          :end-time="game.endTime"
          :start-time="game.startTime" />
      </v-card-text>
      <v-card-text v-if="type === 'large'">
        <slot
          name="gameInfo"
          :game="game"
          :creator="creator"
          :roaster="roaster"
          :subtitle="spots" />
      </v-card-text>
      <v-card-actions v-if="type === 'large'">
        <slot
          name="gameActions"
          :is-creator="isCreator"
          :is-canceled="isCanceled"
          :is-filled="isFilled"
          :is-finished="isFinished"
          :is-going="isGoing"
          :join-handler="join"
          :quit-handler="quit"/>
      </v-card-actions>
    </v-card>
    <app-loader v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { gameMixin } from '@/mixins/gameMixin'
export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object
    },
    type: {
      type: String,
      default: 'small'
    },
    gameOrganizer: {
      type: Boolean,
      default: true
    },
    appBar: {
      type: Boolean,
      default: false
    }
  },
  mixins: [gameMixin],
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions('snackbar', ['showSnack']),
    async quit (id) {
      this.loading = true
      await this.$store.dispatch('quit', id)
      this.$emit('onQuit')
      this.loading = false
    },
    async join (id) {
      this.loading = true
      const res = await this.$store.dispatch('join', id)
      this.$emit('onJoin', res)
      this.loading = false
    },
    async onFilePicked (e) {
      const files = e.target.files
      const fileName = files[0].name
      // console.log(files[0]);
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Please add proper file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imgUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      this.game.imgUrl = await this.$store.dispatch('updateGameImage', {
        gameId: this.game.id,
        image: this.image
      })
      await this.showSnack({
        text: 'Game image successfully updated',
        color: 'primary',
        timeout: 3500
      })
    }
  },
  async mounted () {
    if (this.creator == null) {
      await this.$store.dispatch('fetchPlayers')
    }
    if (this.game == null) {
      await this.$store.dispatch('fetchGames')
    }
  }
}
</script>

<style scoped>

</style>
