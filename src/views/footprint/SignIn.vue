<template>
  <v-row class="ma-0 pt-12" justify="center" align="center" v-if="signInShow">
    <v-col cols="12" sm="7" md="5" lg="4" xl="3">
      <sign-in-page-card
        icon="mdi-shoe-print"
        title="追寻您查走过的足迹"
        text="请先登录，才能查看到您走过的足迹。"
      ></sign-in-page-card>
    </v-col>
  </v-row>
  <router-view v-else />
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState("user", ["info"]),
    signInShow() {
      return !(this.info || this.targetId)
    }
  },
  components: {
    "sign-in-page-card": () => import("../../components/page/SignInPageCard")
  },
  data() {
    return {
      targetId: this.$route.params.targetId
    }
  }
}
</script>

<style scoped></style>
