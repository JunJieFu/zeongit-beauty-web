<template>
  <div>
    <v-progress-linear
      v-show="progress"
      indeterminate
      absolute
      top
      color="primary"
      style="z-index: 999"
    ></v-progress-linear>
    <Header> </Header>
    <v-content>
      <v-divider></v-divider>
      <v-container fluid class="pa-0">
        <keep-alive>
          <router-view :key="decodeURI($route.fullPath)" />
        </keep-alive>
      </v-container>
    </v-content>
    <Menu></Menu>
  </div>
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
