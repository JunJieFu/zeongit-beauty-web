import Vue from "vue"
import Vuetify from "vuetify/lib"
import zhHans from "vuetify/es5/locale/zh-Hans"
import ja from "vuetify/es5/locale/ja"
import storageUtil from "@/plugins/zg/script/util/storage"
import i18n from "@/plugins/i18n"
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg"
  },
  lang: {
    locales: { zhHans, ja },
    current: "zhHans",
    t: (key, ...params) => i18n.t(key, params)
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
