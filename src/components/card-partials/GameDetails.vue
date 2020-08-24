<template>
  <div>
    <div class="mb-2">
      <v-icon>mdi-map-marker</v-icon>
      <span class="ml-2">{{ address }}</span>
    </div>
    <div class="mb-2">
      <v-icon>mdi-clock</v-icon>
      <span class="ml-2">{{ getTime(startTime )}} - {{ getTime(endTime)}}</span>
    </div>
    <div>
      <v-icon>mdi-cog</v-icon>
      <span class="ml-2">{{ skill }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'CardGameDetails',
  props: ['address', 'skill', 'startTime', 'endTime'],
  methods: {
    getTime (time) {
      return time ? moment(time, 'h:mm').format('hh:mm A') : ''
    }
  }
}
</script>

<style scoped>

</style>
