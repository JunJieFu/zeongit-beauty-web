<template>
  <v-row class="ma-0 pt-12" justify="center" align="center" v-if="signInShow">
    <v-col cols="12" sm="7" md="5" lg="4" xl="3">
      <sign-in-page-card
        icon="mdi-image"
        title="您发表过的点点滴滴"
        text="请先登录，才能查看到您上传的作品。"
      ></sign-in-page-card>
    </v-col>
  </v-row>
  <router-view v-else />
</template>

<script>
export default {
  async beforeRouteEnter(to, from, next) {
    let signInShow = true
    if (window.app.$store.state.user.info || to.params.targetId) {
      signInShow = false
    }
    next((vm) => {
      vm.signInShow = signInShow
    })
  },
  components: {
    "sign-in-page-card": () => import("../../components/page/SignInPageCard")
  },
  data() {
    return {
      signInShow: true
    }
  }
}
</script>

<style scoped></style>
