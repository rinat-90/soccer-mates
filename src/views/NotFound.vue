<template>
  <v-row>
    <v-col cols="12" lg="10" offset-lg="1">
      <v-row>
        <v-card width="100%" height="calc(100vh - 100px)">
          <v-card-text>
            <div style="display: block;" class="text-center">
              <div class="headline mb-2">Page not found</div>
              <div class="hidden-md-and-up"><span>Return to </span><router-link to="/">Home Page</router-link></div>
            </div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>

</style>
