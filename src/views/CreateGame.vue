<template>
  <div>
    <top-bar title="Create new game" with-actions>
      <template #left-actions>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <template #right-actions>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </top-bar>
    <v-row>
      <v-col cols="12" lg="10" offset-lg="1">
        <create-game-form type="new-game" />
      </v-col>
    </v-row>
  </div>
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
