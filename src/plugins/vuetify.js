import Vue from "vue"
import Vuetify from "vuetify/lib"
import zhHans from "vuetify/es5/locale/zh-Hans"
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
    themes: {
      light: {
        primary: "#0B99FF",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF0000",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFFF00"
      }
    }
  }
})
