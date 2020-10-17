<template>
  <div>
    <top-bar title="Messages" />
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item to="/messages/chat/1">
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="'John Doe'"></v-list-item-title>
              <v-list-item-subtitle>
                <span class="mr-2">You:</span>
                <span>Are you coming for a game?</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text v-text="'2:1PM'"></v-list-item-action-text>
          </v-list-item>
          <v-list-item to="/messages/chat/2">
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="'John Doe'"></v-list-item-title>
              <v-list-item-subtitle>
                <span class="mr-2">You:</span>
                <span>Are you coming for a game?</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text v-text="'2:1PM'"></v-list-item-action-text>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  data () {
    return {
      messages: [
        { id: '1', from: 'John', time: '14:44', text: 'Hey there' },
        { id: '2', from: 'Mark', time: '14:45', text: 'Hey what\'s up?' },
        { id: '3', from: 'John', time: '14:44', text: 'I\'m good! you?' },
        { id: '4', from: 'Mark', time: '14:44', text: 'Awesome' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
