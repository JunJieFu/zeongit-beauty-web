<template>
  <v-menu offset-y :disabled="!!info">
    <template v-slot:activator="{ on: onMenu }">
      <v-btn color="primary" depressed v-on="onMenu" @click="onClick">
        {{
          user.focus === $enum.FollowState.CONCERNED.key ? `已关注` : `关注`
        }}</v-btn
      >
    </template>
    <sign-in-menu-card
      :title="$vuetify.lang.t('$vuetify.signInTip.title.followBtn')"
      :text="$vuetify.lang.t('$vuetify.signInTip.text.followBtn')"
    ></sign-in-menu-card>
  </v-menu>
</template>

<script>
import { NOOP } from "@/plugins/zg/script/constant/main"
import { mapState } from "vuex"
import { userService } from "@/assets/script/service"

export default {
  props: {
    user: {
      type: Object,
      default: NOOP
    }
  },
  components: {
    "sign-in-menu-card": () => import("../page/SignInMenuCard")
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    async onClick() {
      if (this.info) {
        const result = await userService.follow(this.user.id)
        await this.$resultNotify(result)
        this.$emit("follow", { detail: this.user, focus: result.data })
      }
    }
  }
}
</script>

<style scoped></style>
