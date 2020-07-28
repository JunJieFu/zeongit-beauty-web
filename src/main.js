import Vue from "vue"
import App from "@/App"

import router from "@/router"
import store from "@/store"

import vuetify from "@/plugins/vuetify"
import "@/plugins/zg/style/index.scss"
import "@/plugins/zg/style/variables.scss"
import zg from "@/plugins/zg"
Vue.use(zg)

import _enum from "@/assets/script/constant/enum"
import * as constant from "@/assets/script/constant"
import * as internationalization from "@/assets/script/constant/internationalization"
Vue.prototype.$enum = _enum
Vue.prototype.$constant = constant
Vue.prototype.$internationalization = internationalization

Vue.component("sign-in-menu-card", () =>
  import("./components/page/SignInMenuCard")
)

Vue.config.productionTip = false

window.app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app")
