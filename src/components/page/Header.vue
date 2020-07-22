<template>
  <v-app-bar app clipped-left hide-on-scroll flat class="header">
    <v-tooltip bottom :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon
          :small="$vuetify.breakpoint.xsOnly"
          @click="collapse = !collapse"
          v-on="on"
          v-show="!searchShow || $vuetify.breakpoint.mdAndUp"
        />
      </template>
      <span>主菜单</span>
    </v-tooltip>
    <router-link
      to="/"
      class="title mx-4"
      v-show="!searchShow && $vuetify.breakpoint.mdAndUp"
      style="line-height: 1.5em"
    >
      ZeonGit Beauty
    </router-link>
    <v-text-field
      v-show="$vuetify.breakpoint.mdAndUp || searchShow"
      solo
      hide-details
      clearable
      prepend-inner-icon="mdi-magnify"
      label="搜索"
      v-model="keyword"
      @click:prepend-inner="search"
      @keyup.enter="search"
    />
    <v-spacer />
    <v-tooltip bottom :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          icon
          :small="$vuetify.breakpoint.xsOnly"
          class="ml-4"
          v-on="on"
          v-show="$vuetify.breakpoint.smAndDown"
          @click="searchShow = !searchShow"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      <span>搜索</span>
    </v-tooltip>
    <v-tooltip bottom :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          icon
          :small="$vuetify.breakpoint.xsOnly"
          class="ml-2"
          v-on="on"
          @click="refresh"
          v-show="refreshFunction"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </template>
      <span>刷新</span>
    </v-tooltip>
    <v-tooltip bottom :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          icon
          :small="$vuetify.breakpoint.xsOnly"
          class="ml-2"
          v-on="on"
        >
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </template>
      <span>消息</span>
    </v-tooltip>
    <header-apps></header-apps>
    <header-settings></header-settings>
    <header-user></header-user>
    <v-divider class="header-divider"></v-divider>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
  components: {
    "header-settings": () => import("./header/Settings"),
    "header-apps": () => import("./header/Apps"),
    "header-user": () => import("./header/User")
  },
  data() {
    return { keyword: "", searchShow: false }
  },
  watch: {
    $route: {
      handler(nweValue) {
        if (nweValue.fullPath.indexOf("/search") !== -1) {
          this.keyword = nweValue.params.keyword
        } else {
          this.keyword = ""
        }
      },
      immediate: true
    }
  },
  computed: {
    collapse: {
      get() {
        return this.$store.state.menu.collapse
      },
      set(val) {
        this.MUpdateCollapse(val)
      }
    },
    ...mapState("user", ["info"]),
    ...mapState("alive", ["refreshFunction"])
  },
  methods: {
    ...mapMutations("menu", ["MUpdateCollapse"]),
    search() {
      this.searchShow = false
      this.$router.push(`/search/${encodeURIComponent(this.keyword)}`)
    },
    refresh() {
      this.refreshFunction && this.refreshFunction()
    }
  }
}
</script>

<style lang="scss" scoped>
.header-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
