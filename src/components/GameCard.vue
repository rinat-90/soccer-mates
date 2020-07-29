<template>
  <div v-if="game">
    <v-card :to="isRouter">
      <div v-if="type === 'small'">
        <slot
          v-if="creator"
          name="organizer"
          :creator="creator" />
      </div>
      <div>
        <slot
          name="image"
          :size="size"
          :is-creator="isCreator"
          :on-file-picked="onFilePicked"
          :imgUrl="game.imgUrl" />
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
          :date="game.date"
          :time="game.time" />
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
          :loading="loading"
          :join="join"
          :quit="quit"/>
      </v-card-actions>
    </v-card>
    <app-loader v-if="loading && !game" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GameCard',
  props: {
    gameId: {
      type: String
    },
    type: {
      type: String,
      default: 'small'
    },
    gameOrganizer: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['playerById', 'gameById', 'info', 'loading']),
    game () {
      return this.gameId ? this.gameById(this.gameId) : null
    },
    creator () {
      return this.game != null ? this.playerById(this.game.creatorId) : null
    },
    roaster () {
      return this.goingPlayers.length ? this.goingPlayers.map(item => this.playerById(item)) : []
    },
    goingPlayers () {
      return Object.values(this.game.going)
    },
    isGoing () {
      return this.goingPlayers.length ? !!this.goingPlayers.find(g => g === this.info.userId) : false
    },
    isCreator () {
      return this.creator != null ? this.creator.id === this.info.userId : false
    },
    isCanceled () {
      return this.game.status === 'canceled'
    },
    isFilled () {
      return +this.game.spots - this.goingPlayers.length === 0
    },
    isFinished () {
      return this.game.status === 'finished'
    },
    isRouter () {
      return this.type === 'small' ? `/game/${this.game.id}` : ''
    },
    spots () {
      return !this.goingPlayers.length
        ? `${this.game.spots} spots left`
        : this.isFilled
          ? `${this.game.spots} going, All spots filled`
          : `${this.goingPlayers.length} going,  ${(+this.game.spots - this.goingPlayers.length)} spots left`
    },
    subtitle () {
      return this.type === 'small' ? this.spots : this.game.date
    },
    width () {
      return window.innerWidth
    },
    size () {
      return this.type === 'large'
        ? this.width < 950 ? '200px' : '350px'
        : '200px'
    }
  },
  async mounted () {
    if (this.creator == null) {
      await this.$store.dispatch('fetchPlayers')
    }
    if (this.game == null) {
      await this.$store.dispatch('fetchGames')
    }
  },
  methods: {
    async quit (id) {
      for (const key in this.game.going) {
        if (this.game.going[key] === this.info.userId) {
          await this.$store.dispatch('quit', { gameId: id, key: key })
        }
      }
    },
    async join (id) {
      await this.$store.dispatch('join', id)
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
      await this.$store.dispatch('uploadGameImg', {
        gameId: this.gameId,
        image: this.image
      })
    }
  },
  watch: {
    info (val) {
      if (val) {
        this.$store.dispatch('fetchPlayers')
        this.$store.dispatch('fetchGames')
      }
    }
  }
}
</script>

<style scoped>

</style>
