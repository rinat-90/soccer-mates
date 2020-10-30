<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in list"
        :key="item"
        :disabled="disabledItems.length && !!disabledItems[index] === item"
        @click="$emit('clickItem', item)">
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
    disabledItems: {
      type: Array
    },
    isCreator: {
      type: Boolean
    }
  },
  computed: {
    list () {
      return this.listItems.length && !this.isCreator
        ? this.listItems.filter(item => item !== 'Edit')
        : this.listItems
    }
  }
}
</script>

<style scoped>

</style>
