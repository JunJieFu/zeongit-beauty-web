import { mapMutations, mapState } from "vuex"

export default {
  data() {
    return {
      alive: true
    }
  },
  computed: {
    ...mapState("alive", ["refreshFunction"])
  },
  activated() {
    this.alive = true
    this.MUpdateRefreshFunction(this.init)
  },
  deactivated() {
    this.alive = false
    if (this.init === this.refreshFunction) this.MUpdateRefreshFunction(null)
  },
  methods: {
    ...mapMutations("alive", ["MUpdateRefreshFunction"]),
    ...mapMutations("menu", ["MUpdateProgress"])
  }
}
