<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <div>
        <v-img v-if="imgUrl" :src="imgUrl" :lazy-src="imgUrl" aspect-ratio="1" :height="size" alt="">
          <v-expand-transition v-if="isCreator">
            <div
              v-if="hover"
              class="d-flex justify-center transition-fast-in-fast-out lighten-2  v-card--reveal  white--text"
              style="height: 100%; width: 100%; background: rgba(67, 160,72, 0.6);">
              <v-btn large @click="onPickFile" small dark text class="align-self-center">
                <v-icon left>mdi-camera</v-icon>
                <span>upload</span>
              </v-btn>
            </div>
          </v-expand-transition>
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <app-loader />
            </v-row>
          </template>
        </v-img>
      </div>
    </v-hover>
    <input
      @change="onFilePicked"
      ref="fileInput"
      accept="image/*"
      type="file"
      style="display: none" />
  </div>
</template>

<script>
export default {
  name: 'CardGameImage',
  props: {
    imgUrl: {
      type: String
    },
    isCreator: {
      type: Boolean
    },
    size: {
      type: String
    },
    onFilePicked: {
      type: Function
    },
    loading: {
      type: Boolean
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    }
  }
}
</script>

<style scoped>

</style>
