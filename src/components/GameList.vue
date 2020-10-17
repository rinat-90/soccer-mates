<template>
  <v-row>
    <v-col cols="12">
      <v-card
        v-for="(g, i) in games"
        :key="i"
        :to="`/game/${g.id}`"
        width="100%"
        class="d-flex justify-start align-center mb-5" >
        <div class="px-5 text-center">
          <span class="subtitle-1" style="text-transform: uppercase">{{ g.date | date('month') }}</span><br>
          <span class="headline">{{ g.date | date('day') }}</span>
        </div>
        <v-divider vertical></v-divider>
        <div class="pa-3">
          <span class="heading">{{ g.creator.displayName }}</span><br>
          <span class="subtitle-2">{{ g.title.toUpperCase() }}</span><br>
          <span class="heading">{{ formatTime(g.startTime) }}</span>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
export default {
  name: 'GameList',
  props: {
    games: {
      type: Array
    }
  },
  methods: {
    formatTime (time) {
      return moment(`${time}`, 'h:mma').format('h:mmA')
    }
  }
}
</script>

<style scoped>

</style>
