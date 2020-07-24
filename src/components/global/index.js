import Vue from "vue"
export default {
  install() {
    Vue.component("zg-app", () => import("./ZgApp"))
    Vue.component("avatar", () => import("./Avatar"))
    Vue.prototype.$confirm = function(...args) {
      return window.$confirm(...args)
    }
    Vue.prototype.$notify = function(...args) {
      return window.$notify(...args)
    }
    Vue.prototype.$prompt = function(...args) {
      return window.$prompt(...args)
    }
  }
}
