import { mapMutations } from "vuex"

export default {
  data() {
    return {
      alive: true
    }
  },
  activated() {
    this.alive = true
    this.MUpdateRefreshFunction(this.init)
  },
  deactivated() {
    this.alive = false
    this.MUpdateRefreshFunction(null)
  },
  methods: {
    ...mapMutations("alive", ["MUpdateRefreshFunction"]),
    ...mapMutations("menu", ["MUpdateProgress"])
  }
}
