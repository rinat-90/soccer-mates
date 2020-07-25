export default {
  install (Vue, options) {
    Vue.prototype.$title = function (titleKey) {
      return `${process.env.VUE_APP_TITLE} | ${titleKey}`
    }
  }
}
