<template>
  <v-app-bar app clipped-left light color="white" elevate-on-scroll>
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
      v-show="!searchShow || $vuetify.breakpoint.mdAndUp"
      style="line-height: 1.5em"
    >
      ZeonGit Beauty
    </router-link>
    <v-text-field
      class="mr-4"
      v-show="$vuetify.breakpoint.mdAndUp || searchShow"
      light
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
          class="mr-2"
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
          class="mr-2"
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
          class="mr-2"
          v-on="on"
        >
          <v-icon>mdi-apps</v-icon>
        </v-btn>
      </template>
      <span>应用</span>
    </v-tooltip>
    <header-settings></header-settings>
    <v-menu offset-y :disabled="!info">
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn fab depressed icon v-on="Object.assign(menu, tooltip)">
              <div>
                <v-img
                  :src="$img.head(info ? info.avatarUrl : undefined)"
                  width="40"
                  class="circle"
                />
              </div>
            </v-btn>
          </template>
          <span>个人中心</span>
        </v-tooltip>
      </template>
      <v-list class="py-0 user-menu" v-if="info">
        <v-list-item class="px-0">
          <v-img
            :src="$img.back(info.background, 'backCard')"
            style="width: 100%"
            :aspect-ratio="2"
          />
        </v-list-item>
        <v-list-item class="head-img-item justify-center">
          <div>
            <v-img :src="$img.head(info.avatarUrl)" class="head-img circle" />
          </div>
        </v-list-item>
        <v-list-item class="justify-center flex-column">
          <p class="font-weight-black nickname my-2">{{ info.nickname }}</p>
          <p class="introduction  mb-0">{{ info.introduction }}</p>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="justify-center py-5">
          <v-btn outlined color="primary" @click="signOut">退出登录</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import jsCookie from "js-cookie"
export default {
  components: {
    "header-settings": () => import("./header/Settings")
  },
  data() {
    return { keyword: "", searchShow: false }
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
    ...mapState("user", ["info"])
  },
  methods: {
    ...mapMutations("menu", ["MUpdateCollapse"]),
    search() {
      this.$router.push(`/search/${this.keyword}`)
    },
    async signOut() {
      await this.$confirm({ text: "您确定退出 Zeongit 吗？" })
      jsCookie.remove("token")
      this.$router.replace(
        `/signIn?continue=${encodeURI(this.$route.fullPath)}`
      )
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
