import Vue from "vue"
import Vuex from "vuex"
import _enum from "../assets/script/constant/enum"
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    collapse: false,
    progress: false,
    mode: _enum.ListMode.WATERFALL.key
  },
  mutations: {
    MUpdateCollapse(state, collapse) {
      state.collapse = collapse
    },
    MUpdateProgress(state, progress) {
      state.progress = progress
    },
    MUpdateMode(state, mode) {
      state.mode = mode
    }
  },
  actions: {}
}
