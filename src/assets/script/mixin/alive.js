import { mapMutations } from "vuex"

window.keepAliveObject = {}
export default {
  data() {
    return {
      alive: true,
      recordPath: null
    }
  },
  activated() {
    this.MAddPage(this)
    this.alive = true
  },
  deactivated() {
    this.alive = false
    this.recordPath = this.$route.fullPath
  },
  methods: {
    ...mapMutations("keepAlive", ["MAddPage"])
  }
}
