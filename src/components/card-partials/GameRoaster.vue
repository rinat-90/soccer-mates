<template>
  <v-sheet v-if="roaster.length" class="mx-auto">
    <v-slide-group multiple show-arrows>
      <v-slide-item v-for="item in roaster" :key="item">
        <v-chip class="mx-2">{{ item }}</v-chip>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
  export default {
    name: "GameRoaster",
    props:['roaster'],
    data: () => ({
      model: null,
      //roaster: ['Chi', 'Lion21', 'Kril', 'Asmus', 'Lorry', 'askaban', 'dusess', 'retchi', 'sucker']
    })
  }
</script>

<style scoped>

</style>
