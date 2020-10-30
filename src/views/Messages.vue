<template>
  <div>
    <app-header title="Messages" :back="false">
      <template #left-actions>
        <v-btn icon to="/new-conversation">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <template #right-actions>
        <drop-down-menu
          :list-items="['Report']"
          :disabled-items="['']"
        />
      </template>
    </app-header>
    <v-row>
      <v-col cols="12">
        <app-skeleton-loader v-if="loading" :cols="12" :count="10" type-options="list-item-avatar-two-line" />
        <div class="text-center" v-else-if="!loading && !messages.length">You have no messages</div>
        <v-list v-else>
          <v-list-item
            v-for="msg in messages"
            :key="msg.id"
            :to="`/messages/chat/${msg.id}`">
            <v-list-item-avatar>
              <v-img :src="msg.imgUrl" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>some title</v-list-item-title>
              <v-list-item-subtitle>
                <span class="mr-2" v-if="msg.userId === info.userId">You:</span>
                <span v-else class="mr-2">{{ msg.displayName }}:</span>
                <span>{{ msg.text }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>{{ msg.date }}</v-list-item-action-text>
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
      dialog: false,
      loading: false,
      messages: []
    }
  },
  computed: {
    info () {
      return this.$store.getters.info
    }
  },
  async mounted () {
    this.loading = true
    this.messages = await this.$store.dispatch('getLastMsgFromChat')
    this.loading = false
  }
}
</script>

<style scoped>

</style>
