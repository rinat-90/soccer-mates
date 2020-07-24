<template>
  <v-card-title id="organizer" class="py-2">
    <v-avatar size="35" class="mr-2 white--text" color="primary">
      <img v-if="imgUrl" :src="imgUrl" :alt="name">
      <span v-else>{{ initials }}</span>
    </v-avatar>
    <span v-if="name" style="font-size: 18px;">{{ name }}</span>
  </v-card-title>
</template>
<script>
  export default {
    name: "CardOrganizer",
    props:['name', 'imgUrl'],
    computed:{
      initials(){
        const names = this.name ? this.name.split(' ') : this.name;
        if(names.length > 1){
          return `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`
        }else{
          return`${names[0].charAt(0).toUpperCase()}`
        }
      },
    }
  }
</script>

<style scoped>

</style>
