import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "./assets/style/index.scss"
import "./assets/style/variables.scss"
import _enum from "./assets/script/constant/enum"
import config from "./assets/script/constant/config"
import * as constant from "./assets/script/constant"
import * as internationalization from "./assets/script/constant/internationalization"
import filters from "./assets/script/filter"
import imageUrl from "./assets/script/util/imageUrl"
// import { Prompt } from "./components/global"
import GlobalComponents from "./components/global"

Vue.component("sign-in-menu-card", () =>
  import("./components/page/SignInMenuCard")
)

Vue.use(GlobalComponents)

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$imageUrl = imageUrl
Vue.prototype.$enum = _enum
Vue.prototype.$constant = constant
Vue.prototype.$internationalization = internationalization
Vue.prototype.$config = config
Vue.prototype.$filter = filters
// Vue.prototype.$confirm = Confirm
// Vue.prototype.$prompt = Prompt
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

Vue.prototype.$isMobile = (function() {
  const userAgentInfo = navigator.userAgent
  const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ]
  return !!Agents.filter((it) => userAgentInfo.indexOf(it) > 0).length
})()

window.app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app")
