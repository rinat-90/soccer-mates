<template>
  <div>
    <div class="mb-1">
      <v-icon>mdi-map-marker</v-icon>
      <span class="ml-2">{{ address }}</span>
    </div>
    <div class="mb-1">
      <v-icon>mdi-calendar-clock</v-icon>
      <span class="ml-2">{{ date | date('date') }}, at {{ getTime }}</span>
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
    name: "CardGameDetails",
    props:['address', 'date', 'time', 'skill'],
    computed: {
      getTime(){
        return moment(this.time, 'h:mm').format('hh:mm A')
      },
    }
  }
</script>

<style scoped>

</style>
