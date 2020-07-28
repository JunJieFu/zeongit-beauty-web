<template>
  <v-menu offset-y :disabled="!!info">
    <template v-slot:activator="{ on: onMenu }">
      <v-tooltip bottom :disabled="$isMobile">
        <template v-slot:activator="{ on: onTooltip }">
          <v-btn
            fab
            text
            :x-small="$vuetify.breakpoint.xsOnly"
            v-on="Object.assign(onTooltip, onMenu)"
            @click="onClick"
            class="mx-2"
          >
            <v-icon
              color="error"
              v-if="user.focus === $enum.FollowState.CONCERNED.key"
              >mdi-star</v-icon
            >
            <v-icon v-else>mdi-star-outline</v-icon>
          </v-btn>
        </template>
        <span>
          {{
            user.focus === $enum.FollowState.CONCERNED.key ? `已关注` : `关注`
          }}</span
        >
      </v-tooltip>
    </template>
    <sign-in-menu-card
      :title="$internationalization.FOLLOW_SIGN_IN_TITLE"
      :text="$internationalization.FOLLOW_SIGN_IN_TEXT"
    ></sign-in-menu-card>
  </v-menu>
</template>

<script>
import { NOOP } from "@/plugins/zg/script/constant/main"
import { mapState } from "vuex"
import { userService } from "../../assets/script/service"

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
