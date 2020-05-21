import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    collapse: true,
    progress: false
  },
  mutations: {
    MUpdateCollapse(state, collapse) {
      state.collapse = collapse
    },
    MUpdateProgress(state, progress) {
      state.progress = progress
    }
  },
  actions: {}
}
