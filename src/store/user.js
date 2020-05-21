import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    info: null
  },
  mutations: {
    MSetInfo(state, info) {
      state.info = info
    }
  },
  actions: {}
}
