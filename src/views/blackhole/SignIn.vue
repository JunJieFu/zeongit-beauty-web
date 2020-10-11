<template>
  <v-row class="ma-0" justify="center" align="center" v-if="signInVisible">
    <v-col cols="12" sm="7" md="5" lg="4" xl="3">
      <sign-in-page-card
        :icon="$constant.SIGN_IN_TIP_ICON.blackHole"
        :title="$vuetify.lang.t(`$vuetify.signInTip.title.blackHole`)"
        :text="$vuetify.lang.t(`$vuetify.signInTip.text.blackHole`)"
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
    signInVisible() {
      return !(this.info || this.targetId)
    }
  },
  components: {
    "sign-in-page-card": () => import("@/components/page/SignInPageCard")
  }
}
</script>

<style scoped></style>
