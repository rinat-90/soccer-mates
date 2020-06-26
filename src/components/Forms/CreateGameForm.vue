<template>
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="game.title" label="Title" :rules="rules.title"></v-text-field>
    <v-text-field v-model="game.location" label="Location" :rules="rules.location"></v-text-field>
    <v-text-field v-model="game.date" type="date" label="Date" :rules="rules.date"></v-text-field>
    <v-text-field v-model="game.time" type="time" label="Time" :rules="rules.time"></v-text-field>
    <v-text-field v-model="game.spots" label="Spots" :rules="rules.spots"></v-text-field>
    <v-select v-model="game.skillLevel" :items="skills" label="Skill Level"></v-select>
    <v-text-field v-model="game.imgUrl" label="Image" :rules="rules.imgUrl"></v-text-field>
    <v-textarea v-model="game.desc" label="Description" :rules="rules.desc"></v-textarea>
    <v-btn color="primary" :disabled="!valid" :loading="loading" @click="createGame">Create</v-btn>
  </v-form>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "CreateGameForm",
    data(){
      return{
        valid: false,
        skills: ['All Skills Level', 'Beginner', 'Intermidite', 'Advanced'],
        game:{
          title: '',
          location: '',
          date: '',
          time: '',
          desc: '',
          imgUrl: '',
          spots: 2,
          skillLevel: 'All Skills Level'
        },
        rules:{
          title: [
            v => !!v || 'Title is required',
            v => (v && v.length <= 50) || 'Display name must be less than 30 characters'
          ],
          location: [
            v => !!v || 'Location is required',
          ],
          desc: [
            v => !!v || 'Description is required',
          ],
          imgUrl: [
            v => !!v || 'Image Url is required',
          ],
          date: [
            v => !!v || 'Date is required',
          ],
          time: [
            v => !!v || 'Time Url is required',
          ],
        },
      }
    },
    computed:{
      ...mapGetters(['error', 'loading'])
    },
    methods:{
      async createGame(){
        if(this.$refs.form.validate()){
          const key =  await this.$store.dispatch('createGame', this.game);
          await this.$refs.form.reset();
          await this.$router.push(`/game/${key}`);
        }
      }
    }
  }
</script>

<style scoped>

</style>
