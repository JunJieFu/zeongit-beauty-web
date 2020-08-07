import Vue from "vue"
import filters from "./script/filter"
import imageUrl from "./script/util/imageUrl"
import "./style/index.scss"
import "./style/variables.scss"
import * as config from "./script/constant/config"
export default {
  install() {
    Vue.component("zg-app", () => import("./components/ZgApp/Index"))
    Vue.component("avatar", () => import("./components/Avatar/Index"))
    Vue.prototype.$alert = function(...args) {
      return window.$alert(...args)
    }
    Vue.prototype.$confirm = function(...args) {
      return window.$confirm(...args)
    }
    Vue.prototype.$prompt = function(...args) {
      return window.$prompt(...args)
    }
    Vue.prototype.$notify = function(...args) {
      return window.$notify(...args)
    }
    Vue.prototype.$config = config
    Vue.prototype.$imageUrl = imageUrl
    Object.keys(filters).forEach((key) => {
      Vue.filter(key, filters[key])
    })
    Vue.prototype.$filter = filters
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
  }
}
