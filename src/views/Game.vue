<template>
  <div>
    <top-bar v-if="gameId" :title="gameById(gameId).title" with-actions>
      <template #left-actions>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template #right-actions>
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
      </template>
    </top-bar>
    <v-row>
      <v-col cols="12" sm="12" md="10" offset-md="1" ld="10" offset-lg="1">
        <game-card v-if="gameId" :game-id="$route.params.id" :type="'large'">
          <template #image="{ size, imgUrl, isCreator, onFilePicked }">
            <game-thumbnail id="organizer" :size="size" :img-url="imgUrl" :is-creator="isCreator" :on-file-picked="onFilePicked" />
          </template>
          <template #subtitle="{ subtitle, status }">
            <game-subtitle :subtitle="subtitle" :status="status" />
          </template>
          <template #gameDetails="{ skill, address, date, time }">
            <game-details :skill="skill" :address="address" :date="date" :time="time" />
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

          <template #gameActions="{ isGoing, isCanceled, isFinished, isFilled, isCreator, join, quit, loading }">
            <v-spacer></v-spacer>
            <v-btn v-if="isCreator" :loading="loading" :disabled="isCanceled" color="primary" @click="dialog = !dialog">Edit</v-btn>
            <v-btn v-if="!isGoing" :disabled="isFilled || isGoing || isCanceled || isFinished" color="primary" @click="join($route.params.id)">Join</v-btn>
            <v-btn v-else color="orange lighten-2" dark @click="quit($route.params.id)">Quit</v-btn>
          </template>
        </game-card>
        <app-dialog title="Edit Game" :dialog="dialog" @onClose="dialog = !dialog">
          <CreateGameForm :type="'edit'" @onClose="dialog = !dialog"/>
        </app-dialog>
      </v-col>
    </v-row>
    <v-bottom-navigation app color="white" v-model="bottomNav">
      <v-btn large block color="primary lighten-1">Join</v-btn>
    </v-bottom-navigation>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import CreateGameForm from '../components/Forms/CreateGameForm'
export default {
  name: 'Game',
  components: { CreateGameForm },
  data () {
    return {
      gameId: '',
      dialog: false,
      bottomNav: null
    }
  },
  computed: {
    ...mapGetters(['error', 'loading', 'info', 'gameById']),
    title () {
      return this.gameId ? this.gameById(this.gameId).title : ''
    }
  },
  mounted () {
    this.gameId = this.$route.params.id
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
