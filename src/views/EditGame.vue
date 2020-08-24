<template>
  <div v-if="gameData">
    <top-bar :title="gameData.title" with-actions with-back-btn>
      <template #right-actions>
        <v-btn icon>
          <drop-down-menu :list-items="['cancel', 'postpone',]" />
        </v-btn>
      </template>
    </top-bar>
    <v-row>
      <v-col cols="12" lg="10" offset-lg="1">
        <create-game-form type="edit-game" :game-data="gameData" />
      </v-col>
    </v-row>
  </div>
  <app-loader v-else />
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
  async mounted () {
    this.gameData = await this.$store.dispatch('fetchGameById', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
