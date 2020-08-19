<template>
  <v-col v-if="player" cols="12" lg="10" offset-lg="1">
    <v-row>
      <v-card width="100%">
        <v-btn
          v-if="playerId === info.userId"
          @click="editing = !editing"
          class="mx-2"
          color="primary"
          absolute
          right
          text
          fab>
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
        <v-card-text>
          <div class="text-center mb-5">
            <v-hover #default="{ hover }">
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
            <p v-if="playerId === info.userId">{{ player.email }}</p>
            <v-expand-transition >
              <div v-if="editing">
                <div class="pa-3 primary lighten-5">
                  <div class="headline">My info</div>
                  <user-profile-form @onClose="editing = !editing" />
                </div>
              </div>
            </v-expand-transition>
            <v-divider></v-divider>
            <div class="mt-4 d-flex justify-center">
              <div>
<!--                <span class="headline"><strong>{{ goingGames.length }}</strong></span><br>-->
                <span>Attended</span>
              </div>
              <div class="ml-5">
<!--                <span class="headline"><strong>{{ createdGames.length }}</strong></span><br>-->
                <span>Organized</span>
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <tabs v-if="games.length" :going-games="goingGames" :created-games="[]" :loading="loading" />
        </v-card-text>
      </v-card>
    </v-row>
  </v-col>
  <app-loader v-else />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserProfileForm from './Forms/UserProfileForm'
import Tabs from './Tabs'
import moment from 'moment'
export default {
  name: 'PlayerProfile',
  props: {
    playerId: {
      type: String
    }
  },
  components: { UserProfileForm, Tabs },
  data () {
    return {
      imgUrl: '',
      editing: false
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
    ...mapGetters(['loading', 'error', 'playerById', 'info', 'goingGames', 'games']),
    player () {
      return this.playerId !== this.info.userId ? this.playerById(this.playerId) : this.info
    },
    // createdGames () {
    //   return this.userGames.length
    //     ? this.userGames.filter(g => g.creator.userId === this.info.userId)
    //       .sort((a, b) => moment(`${b.date}${b.time}`, 'YYYY-MM-DD h:mma') - moment(`${a.date}${a.time}`, 'YYYY-MM-DD h:mma'))
    //     : []
    // },
    // goingGames () {
    //   return this.userGames.length ? this.userGames : []
    // }
  },
  methods: {
    ...mapActions('snackbar', ['showSnack']),
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
    }
  }
}
</script>

<style scoped>

</style>
