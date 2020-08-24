<template>
  <v-row>
    <v-col cols="12" sm="12" md="10" offset-md="1" ld="10" offset-lg="1">
      <game-card v-if="game != null" :game="game" :type="'large'" app-bar @onQuit="removePlayer" @onJoin="addPlayer">
        <template #app-bar="{ title, isCreator }">
          <top-bar :title="title" with-actions>
            <template #left-actions>
              <v-btn icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <template #right-actions>
              <v-btn v-if="isCreator" :to="`/game/${game.id}/edit`" icon><v-icon>mdi-pencil</v-icon></v-btn>
              <drop-down-menu v-else :list-items="['Report', 'Cancel']" />
            </template>
          </top-bar>
        </template>
        <template #image="{ size, imgUrl, isCreator, onFilePicked }">
          <game-thumbnail id="organizer" :size="size" :img-url="imgUrl" :is-creator="isCreator" :on-file-picked="onFilePicked" />
        </template>
        <template #subtitle="{ subtitle, status }">
          <game-subtitle :subtitle="subtitle" :status="status" />
        </template>
        <template #gameDetails="{ skill, address, startTime, endTime }">
          <game-details :skill="skill" :address="address" :start-time="startTime" :end-time="endTime" />
        </template>

        <template #gameInfo="{ game, creator, roaster, subtitle }">
          <v-divider class="mt-2"></v-divider>
          <v-subheader class="font-weight-bold">Organizer</v-subheader>
          <router-link :to="info.userId !== creator.userId ? `/player/${creator.userId}` : `/profile`">
            <game-organizer v-if="creator" :name="creator.displayName" :imgUrl="creator.imgUrl" />
          </router-link>
          <v-divider class="mt-2"></v-divider>
          <v-subheader class="font-weight-bold">About the game</v-subheader>
          <div v-html="game.desc"></div>

          <v-divider class="mt-2"></v-divider>
          <div class="d-flex mb-2">
            <v-subheader class="font-weight-bold">Roaster</v-subheader>
            <v-spacer></v-spacer>
            <game-subtitle class="align-self-center" :subtitle="subtitle" />
          </div>
          <game-roaster :roaster="roaster" />
        </template>

        <template #gameActions="{ isGoing, isCanceled, isFinished, isFilled, join, quit }">
          <v-bottom-navigation app color="white" v-model="bottomNav" horizontal>
            <v-btn
              v-if="!isGoing && !isFilled"
              @click="join($route.params.id)"
              :disabled="isFilled || isCanceled || isFinished"
              :loading="loading"
              color="primary lighten-1"
              large
              block>
              <v-icon>mdi-check</v-icon>
              Join
            </v-btn>
            <v-btn
              disabled
              v-else-if="isFilled && !isGoing"
              :loading="loading"
              large
              block>
              All spots filled
              <v-icon>mdi-emoticon-sad-outline</v-icon>
            </v-btn>
            <v-btn
              v-else
              @click="quit($route.params.id)"
              color="red lighten-2"
              large
              block>
              Cancel RSVP
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-bottom-navigation>
        </template>

      </game-card>
      <app-loader v-else />
    </v-col>
  </v-row>

</template>

<script>
import { onMounted } from '@vue/composition-api'
import { mapGetters } from 'vuex'
import useGames from '@/composables/useGames'

export default {
  name: 'Game',
  data () {
    return {
      loading: false,
      game: null,
      bottomNav: null
    }
  },
  computed: {
    ...mapGetters(['error', 'info'])
  },
  methods: {
    async addPlayer (player) {
      this.game.roaster.push(player)
    },
    removePlayer () {
      this.game.roaster = this.game.roaster.filter(p => p.userId !== this.info.userId)
    }
  },
  async mounted () {
    this.loading = true
    this.game = await this.$store.dispatch('fetchGameById', this.$route.params.id)
    this.loading = false
  },
  setup (props, { root }) {
    const { game, getGameById } = useGames()
    onMounted(async () => {
      await getGameById(root.$route.params.id)
    })
    return {
      game1: game
    }
  }
}
</script>

<style scoped>
  .text-capitalize{
    text-transform: uppercase;
  }
  .map{
    width: 100%;
    height: 200px;
    padding-top: 50px;
  }
</style>
