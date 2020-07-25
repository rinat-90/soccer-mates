<template>
  <v-card>
    <v-card-title>
      <div class="display-1  mx-auto">New Game Event</div>
    </v-card-title>
    <v-card-text>
      <create-game-form />
    </v-card-text>
  </v-card>
</template>

<script>
import CreateGameForm from '../components/Forms/CreateGameForm'
export default {
  name: 'CreateGame',
  components: { CreateGameForm },
  metaInfo () {
    return {
      title: this.$title('NewGame')
    }
  }
}
</script>

<style scoped>

</style>
