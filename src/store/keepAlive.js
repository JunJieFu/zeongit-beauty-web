import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    page: {}
  },
  mutations: {
    MAddPage(state, vue) {
      state.page[window.app.$route.fullPath] = vue
    }
  },
  actions: {}
}
