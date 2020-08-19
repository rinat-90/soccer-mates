<template>
  <v-card v-if="game != null" :to="isRouter">
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
        :on-file-picked="onFilePicked"
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
  <app-loader v-else />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
      return this.gameId && this.game != null ? this.playerById(this.game.creatorId) : null
    },
    roaster () {
      return this.game != null ? this.game.roaster.map(id => this.playerById(id)) : []
    },
    gameImgUrl () {
      return this.game != null ? this.game.imgUrl : ''
    },
    isGoing () {
      return this.game && this.game.roaster.length ? !!this.game.roaster.find(id => id === this.info.userId) : false
    },
    isCreator () {
      return this.game != null ? this.game.creatorId === this.info.userId : false
    },
    isCanceled () {
      return this.game.status === 'canceled'
    },
    isFilled () {
      return +this.game.spots - this.game.roaster.length === 0
    },
    isFinished () {
      return this.game.status === 'finished'
    },
    isRouter () {
      return this.type === 'small' ? `/game/${this.game.id}` : ''
    },
    spots () {
      return !this.game.roaster.length
        ? `${this.game.spots} spots left`
        : this.isFilled
          ? `${this.game.spots} going, All spots filled`
          : `${this.game.roaster.length} going,  ${(+this.game.spots - this.game.roaster.length)} spots left`
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
  methods: {
    ...mapActions('snackbar', ['showSnack']),
    async quit (id) {
      await this.$store.dispatch('quit', id)
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
      await this.$store.dispatch('updateGameImage', {
        gameId: this.gameId,
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
