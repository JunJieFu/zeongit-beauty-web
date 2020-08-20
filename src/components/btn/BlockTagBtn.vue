<template>
  <v-btn icon @click="block">
    <v-tooltip top :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-icon
            style="position: absolute"
            v-show="tag.state === $enum.BlockState.NORMAL.key"
            v-on="on"
            >mdi-eye-off-outline</v-icon
          >
        </v-fab-transition>
        <v-fab-transition>
          <v-icon
            style="position: absolute"
            v-show="tag.state === $enum.BlockState.SHIELD.key"
            v-on="on"
            >mdi-eye-outline</v-icon
          >
        </v-fab-transition>
      </template>
      <span>{{ blockValue }}用户</span>
    </v-tooltip>
  </v-btn>
</template>

<script>
import { tagBlackHoleService } from "@/assets/script/service"

export default {
  props: {
    tag: {
      type: [Object],
      required: true
    }
  },
  computed: {
    blockValue() {
      if (this.tag.state === this.$enum.BlockState.NORMAL.key) return "屏蔽"
      else return "解锁"
    }
  },
  methods: {
    async block() {
      const result = await tagBlackHoleService.block(this.tag.tag)
      await this.$resultNotify(result)
      this.$emit("block", result.data)
    }
  }
}
</script>

<style scoped></style>
