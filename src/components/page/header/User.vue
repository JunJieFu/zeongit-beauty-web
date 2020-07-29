<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom :disabled="$isMobile">
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            fab
            depressed
            icon
            v-on="Object.assign(menu, tooltip)"
            class="ml-2"
          >
            <div>
              <avatar :info="info" size="40"></avatar>
            </div>
          </v-btn>
        </template>
        <span>个人中心</span>
      </v-tooltip>
    </template>
    <v-list class="py-0 user-menu" v-if="info">
      <v-list-item class="px-0">
        <v-img
          :src="$imageUrl.background(info.background, 'backCard')"
          style="width: 100%"
          :aspect-ratio="2"
        />
      </v-list-item>
      <v-list-item class="head-img-item justify-center">
        <router-link to="/user" class="d-block">
          <avatar :info="info" size="100" class="head-img"></avatar>
        </router-link>
      </v-list-item>
      <v-list-item class="justify-center flex-column">
        <p class="font-weight-black text--primary title my-2">
          {{ info.nickname }}
        </p>
        <p class="text--secondary mb-0">{{ info.introduction }}</p>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="justify-center py-5">
        <v-btn outlined color="primary" :href="$config.ACCOUNT_HOST"
          >管理我的账号</v-btn
        >
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="justify-center py-5">
        <v-btn outlined color="primary" @click="signOut">退出登录</v-btn>
      </v-list-item>
    </v-list>
    <sign-in-menu-card
      :title="$vuetify.lang.t('$vuetify.signInTip.title.user')"
      :text="$vuetify.lang.t('$vuetify.signInTip.text.user')"
      v-else
    ></sign-in-menu-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex"
import jsCookie from "js-cookie"
import { DOMAIN } from "@/plugins/zg/script/constant/config"
export default {
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    async signOut() {
      await this.$confirm({ text: "您确定退出 Zeongit 吗？" })
      jsCookie.remove("token", {
        domain: DOMAIN
      })
      location.reload()
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/plugins/zg/style/color";
.user-menu {
  max-width: 100%;
  $size: 380px;
  width: $size;
  .head-img-item {
    $head-size: 100px;
    .head-img {
      margin: (-$head-size/2) auto 0 auto;
    }
  }
}
</style>
