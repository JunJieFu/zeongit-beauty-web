import Vue from "vue"
import Vuex from "vuex"
import menu from "./menu"
import keepAlive from "./keepAlive"
import user from "./user"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menu,
    user,
    keepAlive
  }
})
