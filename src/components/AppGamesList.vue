<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" xl="10" offset-xl="1">
      <v-row>
        <v-col
          sm="12" md="6" lg="4" cols="12"
          v-for="(game, i) in games" :key="i">

          <game-card v-if="game.id"  :game-id="game.id" :type="type" :gameOrganizer="gameOrganizer">

            <template #organizer="{ creator }">
              <game-organizer v-if="creator" :name="creator.displayName" :img-url="creator.imgUrl" />
            </template>
            <template #image="{ size, imgUrl }">
              <v-img v-if="imgUrl" :height="size" :src="imgUrl"></v-img>
            </template>
            <template #subtitle="{ subtitle, status }">
              <game-subtitle :subtitle="subtitle" :status="status" />
            </template>
            <template #gameDetails="{ skill, address, date, time }">
              <game-details :skill="skill" :address="address" :date="date" :time="time" />
            </template>
          </game-card>

        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import GameOrganizer from './card-partials/GameOrganizer'
import GameSubtitle from './card-partials/GameSubtitle'
import GameDetails from './card-partials/GameDetails'
export default {
  name: 'AppGamesList',
  props: {
    games: {
      type: Array
    },
    type: {
      type: String
    },
    gameOrganizer: {
      type: Boolean
    }
  },
  components: { GameOrganizer, GameSubtitle, GameDetails }
}
</script>

<style scoped>

</style>
