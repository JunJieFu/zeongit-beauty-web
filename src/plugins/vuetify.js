import Vue from "vue"
import Vuetify from "vuetify/lib"
import zhHans from "vuetify/es5/locale/zh-Hans"
import storageUtil from "@/plugins/zg/script/util/storage"
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg"
  },
  lang: {
    locales: { zhHans },
    current: "zhHans"
  },
  theme: {
    dark: storageUtil.localGet("beauty::menu::dark", false),
    themes: {
      light: {
        primary: "#0B99FF",
        // secondary: "#424242",
        // accent: "#82B1FF",
        // error: "#FF0000",
        info: "#3399ff"
        // success: "#3CB371",
        // warning: "#FBA207"
      }
    }
  }
})
