<template>
  <zg-app>
    <v-progress-linear
      v-show="progress"
      indeterminate
      absolute
      top
      color="primary"
      class="global-progress"
    ></v-progress-linear>
    <zg-header ref="header"></zg-header>
    <zg-menu></zg-menu>
    <div @click.stop="closeSearch">
      <v-main>
        <keep-alive :max="15">
          <router-view
            v-if="$route.meta.keepAlive"
            :key="decodeURI($route.fullPath)"
          />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </v-main>
    </div>
  </zg-app>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import { userService } from "@/assets/script/service"

export default {
  components: {
    "zg-header": () => import("@/components/page/Header"),
    "zg-menu": () => import("@/components/page/Menu")
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
    ...mapMutations("user", ["MSetInfo"]),
    closeSearch() {
      this.$refs.header.closeSearchVisible()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/plugins/zg/style/config";

.global-progress {
  z-index: $overlay-index !important;
}
</style>
