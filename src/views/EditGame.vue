<template>
  <div>
    <app-header :title="title" back>
      <template #right-actions>
        <drop-down-menu
          @clickItem="dropDownClickHandler"
          :list-items="['Postpone', 'Cancel']"
          :disabled-items="['', '']"
        />
      </template>
    </app-header>
    <v-row>
      <v-col cols="12" lg="10" offset-lg="1">
        <app-skeleton-loader v-if="!gameData" :cols="12" :count="8" type-options="list-item" />
        <create-game-form v-else type="edit-game" :game-data="gameData" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CreateGameForm from '@/components/Forms/CreateGameForm'
export default {
  name: 'EditGame',
  components: { CreateGameForm },
  data () {
    return {
      gameData: null
    }
  },
  computed: {
    title () {
      return this.gameData != null ? this.gameData.title : ''
    }
  },
  async mounted () {
    this.gameData = await this.$store.dispatch('fetchGameById', this.$route.params.id)
  },
  methods: {
    dropDownClickHandler () {

    }
  }
}
</script>

<style scoped>

</style>
