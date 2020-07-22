import Vue from "vue"
export default {
  install() {
    Vue.component("notify", () => import("./Notify"))
    Vue.component("confirm", () => import("./Confirm.vue"))
    Vue.prototype.$confirm = function(...args) {
      return window.$confirm(...args)
    }
    Vue.prototype.$notify = function(...args) {
      return window.$notify(...args)
    }
  }
}
