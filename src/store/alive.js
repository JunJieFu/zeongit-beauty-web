import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    pictureMap: {},
    userMap: {},
    refreshFunction: null
  },
  mutations: {
    MAddPictureMap(state, picture) {
      if (picture) {
        state.pictureMap[picture.id] = picture
      }
    },
    MAddUserMap(state, user) {
      if (user) {
        state.userMap[user.id] = user
      }
    },
    MUpdateRefreshFunction(state, fun) {
      state.refreshFunction = fun
    }
  },
  actions: {}
}
