<template>
  <tiptap-vuetify
    v-model="descText"
    placeholder="Tell more about game…"
    :extensions="extensions"
    class="mb-3"
    :card-props="{ flat: true, minHeight: '200px' }"
    style="border-bottom: 1px solid #828282"
  />
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Underline, Paragraph, BulletList, OrderedList, ListItem, Link, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
  name: 'TextEditor',
  props: ['desc'],
  components: { TiptapVuetify },
  data () {
    return {
      extensions: [
        History,
        Link,
        Underline,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Bold,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    }
  },
  computed: {
    descText: {
      get () { return this.desc },
      set (descText) { this.$emit('input', descText) }
    }
  }
}
</script>

<style scoped>

</style>
