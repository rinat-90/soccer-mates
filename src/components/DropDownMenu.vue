<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in listItems"
        :key="index"
        @click="clickHandler(item)"
      >
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'DropDownMenu',
  props: {
    listItems: {
      type: Array
    },
    clickHandler: {
      type: Function
    }
  }
}
</script>

<style scoped>

</style>
