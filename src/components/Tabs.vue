<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="primary"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card color="basil" flat min-height="481">
          <v-card-text>
            <div v-if="item === 'Organized Games'">
              <div v-if="createdGames.length">
                <app-games-list :games="createdGames" :gameOrganizer="false"  />
              </div>
              <app-loader v-else-if="loading" />
              <div v-else>You have not organized any games</div>
            </div>
            <div v-else>
              <div v-if="goingGames.length">
                <app-games-list :games="goingGames" :type="'small'" />
              </div>
              <app-loader v-else-if="loading" />
              <div v-else>You are attending any games</div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import AppGamesList from './AppGamesList'
export default {
  name: 'Tabs',
  props: {
    goingGames: {
      type: Array
    },
    createdGames: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  components: { AppGamesList },
  data () {
    return {
      tab: null,
      items: ['Attending Games', 'Organized Games']
    }
  }
}
</script>

<style scoped>

</style>
