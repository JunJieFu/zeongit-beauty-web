import Vue from "vue"
import App from "@/App"

import router from "@/router"
import store from "@/store"

import vuetify from "@/plugins/vuetify"
import i18n from "@/plugins/i18n"
import "@/plugins/zg/style/index.scss"
import "@/plugins/zg/style/variables.scss"
import zg from "@/plugins/zg"
Vue.use(zg)

import _enum from "@/assets/script/constant/enum"
import * as constant from "@/assets/script/constant"
Vue.prototype.$enum = _enum
Vue.prototype.$constant = constant

Vue.component("sign-in-menu-card", () =>
  import("@/components/page/SignInMenuCard")
)

Vue.config.productionTip = false
window.app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount("#app")

window.signInExceptionCallback = function() {
  window.app?.$store.commit("user/MSetInfo", null)
}
