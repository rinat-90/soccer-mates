<template>
  <div>
    <app-header :title="title" back>
      <template #right-actions>
        <v-btn v-if="isCreator" :to="`/game/${game.id}/edit`" icon><v-icon>mdi-pencil</v-icon></v-btn>
        <drop-down-menu v-else :list-items="['Report', 'Cancel']" />
      </template>
    </app-header>
    <v-row>
      <tabs :tab-items="['details', 'chat']" :can-chat="isGoing || isCreator" height="calc(100vh - 175px)">
        <template #details>
          <app-skeleton-loader
            v-if="loading"
            :cols="12"
            :type-options="'image, card-heading, list-item-three-line, card-heading, list-item-avatar, card-heading, list-item-three-line, card-heading, list-item-three-line'"
            :count="1" />
          <game-card v-else :game="game" type="large" app-bar @onQuit="removeHandler" @onJoin="addHandler">
            <template #image="{ size, imgUrl, isCreator, onFilePickedHandler }">
              <game-thumbnail id="organizer" :size="size" :img-url="imgUrl" :is-creator="isCreator" :on-file-picked="onFilePickedHandler" />
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

            <template #gameActions="{ isGoing, isCanceled, isFinished, isFilled, joinHandler, quitHandler }">
              <v-bottom-navigation app color="white" v-model="bottomNav" horizontal>
                <v-btn
                  v-if="!isGoing && !isFilled"
                  @click="joinHandler($route.params.id)"
                  :disabled="isFilled || isCanceled || isFinished"
                  :loading="loading"
                  color="primary lighten-1"
                  large
                  block>
                  <v-icon>mdi-check</v-icon>
                  Join
                </v-btn>
                <v-btn
                  v-else-if="isFinished"
                  disabled
                  :loading="loading"
                  color="primary lighten-1"
                  large
                  block>
                  Event passed
                  <v-icon>mdi-emoticon-sad-outline</v-icon>
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
                  @click="quitHandler($route.params.id)"
                  color="red lighten-2"
                  large
                  block>
                  Cancel RSVP
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-bottom-navigation>
            </template>

          </game-card>
        </template>
        <template #chat>
          <Chat v-if="game != null" :chat-id="chatId" :chat-title="game.title" />
        </template>
      </tabs>
    </v-row>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import Chat from '@/views/Chat'
import { mapGetters } from 'vuex'

export default {
  name: 'Game',
  components: { Tabs, Chat },
  data () {
    return {
      loading: false,
      game: null,
      bottomNav: null
    }
  },
  computed: {
    ...mapGetters(['error', 'info']),
    chatId () {
      return this.game.chatId
    },
    isCreator () {
      return this.game != null && this.info ? this.game.creator.userId === this.info.userId : false
    },
    isGoing () {
      return this.game && this.game.roaster.length ? !!this.game.roaster.find(p => p.userId === this.info.userId) : false
    },
    title () {
      return this.game != null ? this.game.title : ''
    }
  },
  methods: {
    async addHandler (player) {
      this.game.roaster.push(player)
    },
    removeHandler () {
      this.game.roaster = this.game.roaster.filter(p => p.userId !== this.info.userId)
    }
  },
  async mounted () {
    this.loading = true
    this.game = await this.$store.dispatch('fetchGameById', this.$route.params.id)
    setTimeout(() => {
      this.loading = false
    }, 0)
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
