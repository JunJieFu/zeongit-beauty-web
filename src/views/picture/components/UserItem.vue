<template>
  <v-card-text class="d-flex align-center">
    <router-link :to="`/user/${user.id}`" class="d-block">
      <v-img
        :src="$imageUrl.avatar(user.avatarUrl)"
        width="45"
        :aspect-ratio="1"
        class="circle"
      ></v-img>
    </router-link>
    <div class="ellipsis flex-grow-1 mx-3">
      {{ user.nickname }}
    </div>
    <follow-btn :user="user" @follow="follow"></follow-btn>
  </v-card-text>
</template>

<script>
import { mapState } from "vuex"
import { NOOP } from "../../../assets/script/constant"

export default {
  components: {
    "follow-btn": () => import("../../../components/btn/FollowBtn")
  },
  props: {
    user: {
      type: Object,
      default: NOOP
    }
  },

  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    follow(data) {
      this.$emit("follow", data)
    }
  }
}
</script>

<style scoped></style>
