<template>
  <v-card-text class="d-flex align-center">
    <div>
      <v-img
        :src="$img.head(user.avatarUrl)"
        width="45"
        :aspect-ratio="1"
        class="circle"
      ></v-img>
    </div>
    <div class="ellipsis flex-grow-1 mx-3">
      {{ user.nickname }}
    </div>
    <v-menu offset-y :disabled="!!info">
      <template v-slot:activator="{ on: onMenu }">
        <v-btn color="primary" depressed v-on="onMenu" @click="follow">
          {{
            user.focus === $enum.FollowState.CONCERNED.key ? `已关注` : `关注`
          }}</v-btn
        >
      </template>
      <sign-in-menu-card
        title="想要关注这个画师？"
        text="请先登录，然后才能成为该画师的粉丝。"
      ></sign-in-menu-card>
    </v-menu>
  </v-card-text>
</template>

<script>
import { mapState } from "vuex"
import { NOOP } from "../../../assets/script/constant"

export default {
  props: {
    user: {
      type: Object,
      default: NOOP
    }
  },
  components: {
    "sign-in-menu-card": () => import("../../../components/page/SignInMenuCard")
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    follow() {
      if (this.info) {
        this.$emit("follow")
      }
    }
  }
}
</script>

<style scoped></style>
