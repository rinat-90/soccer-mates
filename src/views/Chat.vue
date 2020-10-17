<template>
  <div>
    <div class="chat-wrapper">
      <v-container class="pa-0">
        <v-row>
          <v-card width="100%">
            <v-card-text ref="chat" class="chat">
              <app-skeleton-loader v-if="loading" :count="7" type-options="list-item-avatar, list-item-two-line" />
              <div v-else-if="!messages.length && !loading">There are no messages</div>
              <v-card
                v-else
                v-for="(m, i) in messages"
                :key="i"
                :color="m.playerRef.userId === info.userId ? 'primary lighten-5' : 'grey lighten-3'"
                class="mb-3" width="auto">
                <v-card-title class="mb-1" style="font-weight: 300;font-size: 16px; opacity: .8">
                  <app-avatar size="30" styles="mr-2 white--text" :img-url="m.playerRef.imgUrl" />
                  <div class="ml-2">{{m.playerRef.userId === info.userId ? info.displayName : m.playerRef.displayName }} </div>
                  <v-spacer></v-spacer>
                  <div class="green--text">{{ m.date.toDate() | date('time') }}</div>
                </v-card-title>
                <v-card-subtitle style="font-size: 18px; line-height: 25px" class="d-flex">
                  <div>{{ m.text }}</div>
                  <v-spacer></v-spacer>
                </v-card-subtitle>
              </v-card>
            </v-card-text>
            <v-card-actions class="chat-form">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="text" @change="onchangeHandler" label="Type something..." filled></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Chat',
  props: ['chatId', 'chatTitle', 'selectedTab'],
  data () {
    return {
      loading: false,
      text: ''
    }
  },
  computed: {
    ...mapGetters(['info', 'messages'])
  },
  methods: {
    ...mapActions(['bindMessages', 'unbindMessages', 'sendMsg']),
    async onchangeHandler () {
      if (this.text !== '') {
        const data = {
          text: this.text,
          date: new Date(),
          chatId: this.chatId
        }
        await this.sendMsg(data)
        this.text = ''
      }
    }
  },
  async mounted () {
    if (this.chatId != null) {
      this.loading = true
      await this.bindMessages(this.chatId)
      this.loading = false
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
    }
    this.loading = false
  },
  watch: {
    messages () {
      setTimeout(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      }, 0)
    }
  },
  beforeDestroy () {
    this.unbindMessages()
  }
}
</script>

<style scoped>
.chat-wrapper{
  width: 100%;
  position: relative;
  overflow: hidden;
}
.chat-form{
  position: fixed;
  height: auto;
  bottom: -40px;
  left: 0;
  right: 0;
  background: #fff;
}
.chat{
  height: calc(100vh - 200px);
  width:100%;
  overflow-y: auto;
}
</style>
