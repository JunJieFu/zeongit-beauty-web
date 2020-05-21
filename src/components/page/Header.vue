<template>
  <v-app-bar app clipped-left light color="white" elevate-on-scroll>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon
          @click="collapse = !collapse"
          v-on="on"
          v-show="!searchShow || $vuetify.breakpoint.mdAndUp"
        />
      </template>
      <span>主菜单</span>
    </v-tooltip>
    <span
      class="title ml-2 mr-4"
      v-show="!searchShow || $vuetify.breakpoint.mdAndUp"
    >
      ZeonGit Beauty
    </span>
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
          fab
          depressed
          icon
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
        <v-btn fab depressed icon class="mr-2" v-on="on">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </template>
      <span>消息</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn fab depressed icon class="mr-2" v-on="on">
          <v-icon>mdi-apps</v-icon>
        </v-btn>
      </template>
      <span>应用</span>
    </v-tooltip>
    <v-menu offset-y :disabled="!info">
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn fab depressed icon v-on="Object.assign(menu, tooltip)">
              <img
                :src="$img.head(info ? info.avatarUrl : undefined)"
                width="40"
                class="head-img"
              />
            </v-btn>
          </template>
          <span>主菜单</span>
        </v-tooltip>
      </template>
      <v-list class="py-0 user-menu" v-if="info">
        <v-list-item class="background px-0">
          <img
            :src="$img.back(info.background, 'backCard')"
            style="width: 100%"
          />
        </v-list-item>
        <v-list-item class="head-img-item">
          <img :src="$img.head(info.avatarUrl)" class="head-img" />
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
    search(e) {
      console.log(e)
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
.head-img {
  border-radius: 50%;
}
.user-menu {
  max-width: 100%;
  $size: 380px;
  width: $size;
  .background {
    text-align: center;
    height: $size/2;
    align-items: end;
  }
  .head-img-item {
    .head-img {
      $head-size: 100px;
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
