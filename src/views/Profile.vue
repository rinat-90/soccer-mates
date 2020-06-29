<template>
  <v-layout row wrap>
    <v-card width="100%">
      <v-card-text>
        <div class="text-center mb-5">
          <v-avatar color="primary darken-1" size="100" class="white--text" @click="onPickFile">
            <img v-if="info.imgUrl" :src="info.imgUrl" alt="">
            <span v-else>ADD</span>
          </v-avatar>
          <input
            @change="onFilePicked"
            ref="fileInput"
            accept="image/*"
            type="file"
            style="display: none" />
          <div class="display-1 mt-2">{{ info.displayName }}</div>
          <p>{{ info.email }}</p>
        </div>
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
          <v-tab-item
            v-for="item in items"
            :key="item"
          >
            <v-card
              color="basil"
              flat
            >
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "Profile",
    data () {
      return {
        imgUrl: '',
        tab: null,
        items: ['Attending Games', 'Organized Games', 'History'],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    computed:{
      ...mapGetters(['loading', 'error', 'playerById', 'info'])
    },
    methods:{
      onPickFile(){
        this.$refs.fileInput.click()
      },
      async onFilePicked(e){
        const files = e.target.files;
        const fileName = files[0].name;
        //console.log(files[0]);
        if(fileName.lastIndexOf('.') <= 0){
          return alert('Please add proper file')
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.imgUrl = fileReader.result
        });
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
        await this.$store.dispatch('uploadPhoto', this.image)
      }
    }
  }
</script>

<style scoped>

</style>
