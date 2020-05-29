import Vue from "vue"
import Vuex from "vuex"
import menu from "./menu"
import alive from "./alive"
import user from "./user"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menu,
    user,
    alive
  }
})
