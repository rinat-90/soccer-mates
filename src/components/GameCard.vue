<template>
  <v-card :to="isRouter">
    <div v-if="type === 'short'">
      <slot
        v-if="creator"
        name="organizer"
        :creator="creator" />
    </div>
    <div>
      <slot
        name="image"
        :size="size"
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
    <v-card-text v-if="type === 'long'">
      <slot
        name="gameInfo"
        :game="game"
        :creator="creator"
        :roaster="roaster"
        :subtitle="spots" />
    </v-card-text>
    <v-card-actions v-if="type === 'long'">
      <slot
        name="gameActions"
        :is-creator="isCreator"
        :is-canceled="isCanceled"
        :is-filled="isFilled"
        :is-finished="isFinished"
        :is-going="isGoing"
        :join="join"
        :unjoin="unjoin"/>
    </v-card-actions>
  </v-card>
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
      default: 'short'
    },
    gameOrganizer: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['playerById', 'gameById', 'info']),
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
      return this.creator.id === this.info.userId
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
      return this.type === 'short' ? `/game/${this.game.id}` : ''
    },
    spots () {
      return !this.goingPlayers.length
        ? `${this.game.spots} spots left`
        : this.isFilled
          ? `${this.game.spots} going, All spots filled`
          : `${this.goingPlayers.length} going,  ${(+this.game.spots - this.goingPlayers.length)} spots left`
    },
    subtitle () {
      return this.type === 'short' ? this.spots : this.game.date
    },
    width () {
      return window.innerWidth
    },
    size () {
      return this.type === 'long'
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
    async unjoin (id) {
      for (const key in this.game.going) {
        if (this.game.going[key] === this.info.userId) {
          await this.$store.dispatch('unjoin', { gameId: id, key: key })
        }
      }
    },
    async join (id) {
      await this.$store.dispatch('join', id)
    }
  }
}
</script>

<style scoped>

</style>
