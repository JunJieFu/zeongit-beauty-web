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
      if (info.id) {
        state.info = info
      }
    }
  },
  actions: {}
}
