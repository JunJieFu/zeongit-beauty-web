<template>
  <v-app>
    <v-progress-linear
      v-show="progress"
      indeterminate
      absolute
      top
      color="primary"
      style="z-index: 999"
    ></v-progress-linear>
    <Header></Header>
    <Menu></Menu>
    <v-main>
      <v-divider></v-divider>
      <keep-alive :max="15">
        <router-view
          v-if="$route.meta.keepAlive"
          :key="decodeURI($route.fullPath)"
        />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" /> </v-main
  ></v-app>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import Menu from "../components/page/Menu"
import Header from "../components/page/Header"
import { userService } from "../assets/script/service"

export default {
  components: {
    Header,
    Menu
  },
  computed: {
    ...mapState("menu", ["progress"])
  },
  async beforeRouteEnter(to, from, next) {
    const result = await userService.getInfo()
    window.app.$store.commit("user/MSetInfo", result.data)
    next((vm) => {
      vm.MSetInfo(result.data)
    })
  },
  methods: {
    ...mapMutations("user", ["MSetInfo"])
  }
}
</script>
<style lang="scss" scoped></style>
