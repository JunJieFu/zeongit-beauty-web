export default {
  data() {
    return {
      alive: true,
      recordPath: null
    }
  },
  activated() {
    this.alive = true
  },
  deactivated() {
    this.alive = false
    this.recordPath = this.$route.fullPath
  }
}
