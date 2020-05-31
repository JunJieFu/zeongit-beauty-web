<template>
  <v-row class="ma-0" justify="center" align="center" v-if="signInShow">
    <v-col cols="12" sm="7" md="5" lg="4" xl="3">
      <sign-in-page-card
        :icon="$constant.SIGN_IN_TIP_DETAIL_LIST[type].icon"
        :title="
          $internationalization[$constant.SIGN_IN_TIP_DETAIL_LIST[type].title]
        "
        :text="
          $internationalization[$constant.SIGN_IN_TIP_DETAIL_LIST[type].text]
        "
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
    },
    type() {
      return this.$route.fullPath?.split("/").filter((it) => it !== "")[0]
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
