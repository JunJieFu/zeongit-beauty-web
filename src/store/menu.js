import Vue from "vue"
import Vuex from "vuex"
import _enum from "../assets/script/constant/enum"
import storageUtil from "../assets/script/util/storage"
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    collapse: storageUtil.localGet("beauty::menu::collapse", false),
    progress: false,
    mode: storageUtil.localGet(
      "beauty::menu::mode",
      _enum.ListMode.WATERFALL.key
    )
  },
  mutations: {
    MUpdateCollapse(state, collapse) {
      storageUtil.localSet("beauty::menu::collapse", collapse)
      state.collapse = collapse
    },
    MUpdateProgress(state, progress) {
      state.progress = progress
    },
    MUpdateMode(state, mode) {
      storageUtil.localSet("beauty::menu::mode", mode)
      state.mode = mode
    }
  },
  actions: {}
}
