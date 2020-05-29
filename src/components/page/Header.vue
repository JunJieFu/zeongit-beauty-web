<template>
  <v-app-bar app clipped-left elevate-on-scroll>
    <v-tooltip bottom>
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
    <v-tooltip bottom>
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
    <v-tooltip bottom>
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
    <v-tooltip bottom>
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
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          icon
          :small="$vuetify.breakpoint.xsOnly"
          v-on="on"
          class="ml-2"
        >
          <v-icon>mdi-apps</v-icon>
        </v-btn>
      </template>
      <span>应用</span>
    </v-tooltip>
    <header-settings></header-settings>
    <header-user></header-user>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
  components: {
    "header-settings": () => import("./header/Settings"),
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
      this.$router.push(`/search/${encodeURI(this.keyword)}`)
    },
    refresh() {
      this.refreshFunction && this.refreshFunction()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/color";
.user-menu {
  max-width: 100%;
  $size: 380px;
  width: $size;
  .head-img-item {
    $head-size: 100px;
    .head-img {
      height: $head-size;
      width: $head-size;
      margin: (-$head-size/2) auto 0 auto;
      border: 3px solid #fff;
    }
  }
  .nickname {
    color: $font-color-dark;
    font: 500 16px/22px Google Sans, Roboto, RobotoDraft, Helvetica, Arial,
      sans-serif;
  }
  .introduction {
    color: $font-color-dark-fade;
    font: 400 14px/19px Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  }
}
</style>
