<template>
  <v-row>
    <v-col cols="12" lg="10" offset-lg="1">
      <v-card>
        <v-card-title>
          <div class="display-1  mx-auto">New Game Event</div>
        </v-card-title>
        <v-card-text>
          <create-game-form type="new-game" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
