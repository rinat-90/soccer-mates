<template>
  <v-layout row wrap>
    <v-card width="100%">
      <v-card-text>
        <div class="text-center mb-5">
          <v-hover v-slot:default="{ hover }">
            <v-avatar size="100" class="white--text">
              <app-loader v-if="loading" />
              <v-img v-if="player.imgUrl && !loading" :src="player.imgUrl" alt="">
                <v-expand-transition v-if="playerId === info.userId">
                  <div
                    v-if="hover"
                    class="d-flex justify-center transition-fast-in-fast-out lighten-2  v-card--reveal  white--text"
                    style="height: 100%; width: 100%; background: rgba(67, 160,72, 0.8);">
                    <v-btn @click="onPickFile" small dark text class="align-self-center">Update</v-btn>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-btn @click="onPickFile" text  v-if="!player.imgUrl && !loading" color="primary darken-1">add photo</v-btn>
            </v-avatar>
          </v-hover>
          <input
            @change="onFilePicked"
            ref="fileInput"
            accept="image/*"
            type="file"
            style="display: none" />
          <div class="display-1 mt-2">{{ player.displayName }}</div>
          <p>{{ player.email }}</p>
          <v-divider></v-divider>
          <div class="mt-2 d-flex justify-center">
            <div>
              <span class="headline"><strong>{{ goingGames.length }}</strong></span><br>
              <span>Attended</span>
            </div>
            <div class="ml-5">
              <span class="headline"><strong>{{ createdGames.length }}</strong></span><br>
              <span>Organized</span>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="primary"
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card color="basil" flat>
              <v-card-text>
                <div v-if="item === 'Organized Games'">
                  <app-loader v-if="loading" />
                  <div v-if="createdGames.length">
                    <app-games-list :games="createdGames" :gameOrganizer="false"  />
                  </div>
                  <div v-else>No games yet</div>
                </div>
                <div v-else>
                  <app-loader v-if="loading" />
                  <div v-if="goingGames.length">
                    <app-games-list :games="goingGames" :type="'short'" />
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import AppGamesList from '../components/AppGamesList'
import moment from 'moment'
export default {
  name: 'PlayerProfile',
  props: ['playerId'],
  components: { AppGamesList },
  data () {
    return {
      imgUrl: '',
      tab: null,
      items: ['Attending Games', 'Organized Games']
    }
  },
  async mounted () {
    if (!this.games.length) {
      await this.$store.dispatch('fetchGames')
    }
    if (this.player == null) {
      await this.$store.dispatch('fetchPlayers')
    }
  },
  computed: {
    ...mapGetters(['loading', 'error', 'playerById', 'info', 'games']),
    player () {
      return this.playerId ? this.playerById(this.playerId) : null
    },
    createdGames () {
      return this.games.length
        ? this.games.filter(g => g.creatorId === this.playerId)
          .sort((a, b) => moment(`${b.date}${b.time}`, 'YYYY-MM-DD h:mma') - moment(`${a.date}${a.time}`, 'YYYY-MM-DD h:mma'))
        : []
    },
    goingGames () {
      const games = []
      this.games.forEach(g => {
        for (const key in g.going) {
          if (g.going[key] === this.playerId) {
            games.push(g)
          }
        }
      })
      return games.sort((a, b) => moment(`${b.date}${b.time}`, 'YYYY-MM-DD h:mma') - moment(`${a.date}${a.time}`, 'YYYY-MM-DD h:mma'))
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
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
      await this.$store.dispatch('uploadPhoto', this.image)
    }
  }
}
</script>

<style scoped>

</style>
