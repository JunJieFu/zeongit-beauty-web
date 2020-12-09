<template>
  <v-btn icon @click="block">
    <v-tooltip top :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-icon style="position: absolute" v-show="user.state === 0" v-on="on"
            >mdi-eye-off-outline</v-icon
          >
        </v-fab-transition>
        <v-fab-transition>
          <v-icon style="position: absolute" v-show="user.state === 1" v-on="on"
            >mdi-eye-outline</v-icon
          >
        </v-fab-transition>
      </template>
      <span>{{ blockValue }}用户</span>
    </v-tooltip>
  </v-btn>
</template>

<script>
import { userBlackHoleService } from "@/assets/script/service"

export default {
  props: {
    user: {
      type: [Object],
      required: true
    }
  },
  computed: {
    blockValue() {
      if (this.user.state === 1) return "屏蔽"
      else return "解锁"
    }
  },
  methods: {
    async block() {
      const result = await userBlackHoleService.block(this.user.id)
      await this.$resultNotify(result)
      this.$emit("block", { detail: this.user, state: result.data })
    }
  }
}
</script>

<style scoped></style>
