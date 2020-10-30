<template>
  <v-col cols="12" lg="10" offset-lg="1">
    <app-header :title="displayName" :back="false">
      <template #left-actions>
        <v-btn icon v-if="$route.path === '/profile'"  @click="sheet = !sheet">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-else icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <template #right-actions>
        <drop-down-menu :click-handler="dropDownClickHandler" :list-items="['Change password','Delete Account']" :disabled-items="['']" />
      </template>
    </app-header>
    <v-row>
      <v-card flat width="100%" height="calc(100vh - 170px)">
        <v-card-text>
          <div class="text-center mb-5">
            <v-skeleton-loader v-if="loading" width="75px" class="mx-auto text-center"  type="avatar" />
            <v-hover v-else #default="{ hover }">
              <v-avatar size="75" class="white--text" style="border: 2px solid green">
                <app-loader v-if="loading" />
                <v-img v-else-if="!loading && player" :src="player.imgUrl" alt="">
                  <v-expand-transition v-if="playerId === info.userId">
                    <div
                      v-if="hover"
                      class="d-flex justify-center transition-fast-in-fast-out lighten-2  v-card--reveal  white--text"
                      style="height: 100%; width: 100%; background: rgba(67, 160,72, 0.8);">
                      <v-btn @click="onPickFile" small dark text class="align-self-center">Update</v-btn>
                    </div>
                  </v-expand-transition>
                </v-img>
                <v-btn v-else @click="onPickFile" color="primary darken-1" icon text>
                  <v-icon>mdi-camera</v-icon>
                </v-btn>
              </v-avatar>
            </v-hover>
            <input
              @change="onFilePicked"
              ref="fileInput"
              accept="image/*"
              type="file"
              style="display: none" />
            <div class="pa-3 mx-auto text-center">
              <span v-if="!loading">Hi, I'm {{ displayName}} and I like to to play soccer at {{ positions }} position(s).</span>
              <v-skeleton-loader v-else type="paragraph" />
            </div>
            <div class="mt-2 text-center">
              <v-skeleton-loader v-if="loading" type="button" class="mx-auto mb-3" width="75px" />
              <div v-else>
                <v-btn v-if="playerId === info.userId" text color="primary" class="mb-3" @click="signOut">Sign out</v-btn>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="mt-4 d-flex justify-center">
              <div>
                <v-skeleton-loader class="mx-auto text-center" width="100px" v-if="loading" type="list-item-two-line" />
                <div v-else>
                  <span class="headline">
                  <strong>{{ games.length }}</strong>
                </span><br>
                  <span>Attended</span>
                </div>
              </div>
              <div class="ml-5">
                <v-skeleton-loader class="mx-auto text-center" width="100px" v-if="loading" type="list-item-two-line" />
                <div v-else>
                  <span class="headline"><strong>{{ organizedGamesCount }}</strong></span><br>
                  <span>Organized</span>
                </div>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
        </v-card-text>
        <tabs :tab-items="['activities']" :height="'50vh'" style="overflow-y: scroll">
          <template #activities>
            <app-skeleton-loader v-if="loading" :count="3" :cols="12" type-options="list-item-three-line" />
            <div v-if="!loading && !games.length" class="text-center">You have no activities</div>
            <game-list v-else  :games="games" />
          </template>
        </tabs>
      </v-card>
      <v-bottom-sheet v-model="sheet" persistent>
        <v-sheet class="text-center">
          <v-toolbar color="primary" dark>
            <v-toolbar-title class="mx-auto">Edit my info</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-row>
              <v-col cols="10" offset="1">
                <user-profile-form @onClose="sheet = !sheet" @onUpdateInfo="updatePlayerInfo"/>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-bottom-sheet>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserProfileForm from './Forms/UserProfileForm'
import Tabs from './Tabs'
import GameList from '@/components/GameList'
export default {
  name: 'PlayerProfile',
  props: {
    playerId: {
      type: String
    }
  },
  components: { UserProfileForm, Tabs, GameList },
  data () {
    return {
      imgUrl: '',
      editing: false,
      loading: false,
      sheet: false,
      player: null
    }
  },
  async mounted () {
    this.loading = true
    if (this.playerId && this.player == null) {
      this.player = await this.$store.dispatch('fetchPlayerById', this.playerId)
      this.loading = false
    }
    this.loading = false
  },
  computed: {
    ...mapGetters(['info']),
    positions () {
      return this.player && this.player.positions ? this.player.positions.map(item => item).join(', ').toLowerCase() : 'any'
    },
    displayName () {
      return this.player !== null ? this.player.displayName : ''
    },
    games () {
      return this.player && this.player.games ? this.player.games : []
    },
    organizedGamesCount () {
      return this.player && this.player.games
        ? this.player.games.filter(g => g.creator.userId === this.info.userId).length
        : 0
    }
  },
  methods: {
    ...mapActions('snackbar', ['showSnack']),
    async signOut () {
      await this.$store.dispatch('signOut')
      await this.$router.push('/signin')
    },
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
      await this.$store.dispatch('uploadUserPhoto', this.image)
      this.player = await this.$store.dispatch('fetchPlayerById', this.info.userId)
      await this.showSnack({
        text: 'Profile image successfully uploaded',
        color: 'primary',
        timeout: 3500
      })
    },

    async updatePlayerInfo () {
      this.player = await this.$store.dispatch('fetchPlayerById', this.info.userId)
      this.sheet = !this.sheet
    },
    dropDownClickHandler (item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>

</style>
