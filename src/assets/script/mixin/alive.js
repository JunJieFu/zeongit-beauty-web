export default {
  data() {
    return {
      alive: true
    }
  },
  activated() {
    this.alive = true
  },
  deactivated() {
    this.alive = false
  }
}
