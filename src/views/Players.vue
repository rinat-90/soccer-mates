<template>
  <div>
    <top-bar with-component>
      <template #component>
        <v-text-field v-model="searchVal" prepend-inner-icon="mdi-magnify" color="primary" placeholder="Search..."  class="mt-5" filled rounded dense ></v-text-field>
      </template>
    </top-bar>
    <v-row v-if="filteredPlayers.length">
      <v-col cols="12" lg="10" offset-lg="1">
        <v-row>
          <v-list width="100%">
            <v-list-item
              v-for="player in filteredPlayers"
              :key="player.userId"
              :to="info.userId !== player.userId ? `/player/${player.userId}` : `/profile`">
              <v-list-item-avatar>
                <v-img :src="player.imgUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="player.displayName"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-col>
    </v-row>
    <app-loader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Players',
  components: {  },
  metaInfo () {
    return {
      title: this.$title('Players')
    }
  },
  data () {
    return {
      searchVal: '',
      loading: false,
      players: []
    }
  },
  computed: {
    ...mapGetters(['info']),
    filteredPlayers () {
      return this.players.length
        ? this.players.filter(player => {
          return player.displayName.toLowerCase().indexOf(this.searchVal.toLowerCase()) > -1
        })
        : []
    }
  },
  async mounted () {
    this.loading = true
    this.players = await this.$store.dispatch('fetchPlayers')
    this.loading = false
  }
}
</script>

<style scoped>

</style>
