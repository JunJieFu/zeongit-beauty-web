import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "./assets/style/index.scss"
import _enum from "./assets/script/constant/enum"
import config from "./assets/script/constant/config"
import filters from "./assets/script/filter"
import Img from "./assets/script/util/imgUrl"
import { Notification, Confirm, Prompt } from "./components/global"

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$img = Img
Vue.prototype.$enum = _enum
Vue.prototype.$config = config
Vue.prototype.$filter = filters
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = Confirm
Vue.prototype.$prompt = Prompt
Vue.config.productionTip = false

Vue.prototype.$resultNotify = function(result) {
  return new Promise((resolve, reject) => {
    if (result?.status !== 200) {
      window.app.$notify({
        text: result?.message || "服务器错误",
        color: "error"
      })
      reject(result)
    } else {
      resolve(result)
    }
  })
}

window.app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app")
