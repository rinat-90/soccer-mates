<template>
  <v-col v-if="player" cols="12" lg="10" offset-lg="1">
    <top-bar :title="player.displayName" with-actions>
      <template #left-actions>
        <v-btn icon v-if="$route.path === '/profile'"  @click="sheet = !sheet">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-else icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <template #right-actions>
<!--        <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>-->
        <drop-down-menu :list-items="['Delete Account']" />
      </template>
    </top-bar>
    <v-row>
      <v-card flat width="100%">
        <v-card-text>
          <div class="text-center mb-5">
            <v-hover #default="{ hover }">
              <v-avatar size="75" class="white--text" style="border: 2px solid green">
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
            <div class="pa-3 mx-auto text-center">
              <span>Hi, I'm {{ player.displayName}} and I like to to play soccer at {{ positions }} position(s).</span>
            </div>
            <div class="mt-2">
              <v-btn v-if="playerId === info.userId" text color="primary" class="mb-3" @click="signOut">Sign out</v-btn>
            </div>
            <v-divider></v-divider>
            <div class="mt-4 d-flex justify-center">
              <div>
                <span class="headline"><strong>2</strong></span><br>
<!--                <span class="headline"><strong>{{ goingGames.length }}</strong></span><br>-->
                <span>Attended</span>
              </div>
              <div class="ml-5">
                <span class="headline"><strong>3</strong></span><br>
<!--                <span class="headline"><strong>{{ createdGames.length }}</strong></span><br>-->
                <span>Organized</span>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
        </v-card-text>
        <tabs :tab-items="['activities']">
          <template #activities>
            <game-list v-if="player.games.length" :games="player.games" />
            <div v-else>You have no activities</div>
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
  <app-loader v-else />
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
    if (this.$route.params.id) {
      this.loading = true
      this.player = await this.$store.dispatch('fetchPlayerById', this.$route.params.id)
      this.loading = false
    } else {
      this.loading = true
      this.player = await this.$store.dispatch('fetchPlayerById', this.info.userId)
      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['info']),
    // goingGames () {
    //   return Object.keys(this.player).length ? this.player.games.map(id => this.gameById(id)) : []
    // },
    positions () {
      return this.player && this.player.positions ? this.player.positions.map(item => item).join(', ').toLowerCase() : 'any'
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
      await this.showSnack({
        text: 'Profile image successfully uploaded',
        color: 'primary',
        timeout: 3500
      })
    },

    async updatePlayerInfo () {
      this.player = await this.$store.dispatch('fetchPlayerById', this.info.userId)
      this.sheet = !this.sheet
    }
  }
}
</script>

<style scoped>

</style>
