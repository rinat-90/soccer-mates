<template>
  <div>
    <app-header title="New Conversation" back>
      <template #right-actions>
        <drop-down-menu
          :list-items="['Report']"
          :disabled-items="['']"
        />
      </template>
    </app-header>
    <v-row>
      <v-col cols="12" lg="10" offset-lg="1">
        <v-text-field v-model="searchVal" label="Search for users..." append-icon="mdi-magnify" filled />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="10" offset-lg="1">
        <div v-if="selectedPlayers.length" class="d-flex justify-space-between">
          <div >
            <v-chip
              v-for="player in selectedPlayers"
              :key="player.id"
              @click:close="removePlayerFromList(player.id)"
              color="primary"
              class="ml-2"
              close>
              {{ player.displayName }}
            </v-chip>
          </div>
          <div>
            <v-btn text @click="createAndGoToChat">create chat</v-btn>
          </div>
        </div>
        <div v-else>
          Nobody selected
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="10" offset-lg="1">
        <v-row>
          <v-list width="100%">
            <app-skeleton-loader v-if="loading" :cols="12" :count="10" type-options="list-item-avatar" />
            <v-list-item
              @click="addPlayerToList(player.userId)"
              v-else
              v-for="player in filteredPlayers"
              :key="player.userId">
              <v-list-item-avatar>
                <v-img :src="player.imgUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="player.displayName"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon color="primary" v-if="player.selected">mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'NewConversation',
  data () {
    return {
      searchVal: '',
      players: [],
      loading: false,
      selectedPlayers: []
    }
  },
  computed: {
    filteredPlayers () {
      return this.players.length
        ? this.players.filter(player => {
          return player.displayName.toLowerCase().indexOf(this.searchVal.toLowerCase()) > -1
        }).filter(p => p.userId !== this.info.userId)
        : []
    },
    info () {
      return this.$store.getters.info
    }
  },
  async mounted () {
    this.loading = true
    this.players = await this.$store.dispatch('fetchPlayers')
    this.players.map(p => p.selected = false)
    this.loading = false
  },
  methods: {
    addPlayerToList (id) {
      const players = [...this.players]
      players.find(player => {
        if (player.id === id) {
          player.selected = !player.selected
          if (player.selected && !this.selectedPlayers.includes(player.id)) {
            this.selectedPlayers.push({ id: player.id, displayName: player.displayName })
          } else {
            this.selectedPlayers = this.selectedPlayers.filter(p => p.id !== player.id)
          }
        }
      })
      this.players = players
    },
    removePlayerFromList (id) {
      this.selectedPlayers = this.selectedPlayers.filter(p => p.id !== id)
      this.players.map(p => {
        if (p.id === id) {
          p.selected = !p.selected
        }
      })
    },
    async createAndGoToChat () {
      const id = await this.$store.dispatch('createChat', this.selectedPlayers.map(p => p.id))
      await this.$router.push(`/messages/chat/${id}`)
    }
  }
}
</script>

<style scoped>

</style>
