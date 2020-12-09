<template>
  <v-btn icon @click="block">
    <v-tooltip top :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-icon style="position: absolute" v-show="tag.state === 0" v-on="on"
            >mdi-eye-off-outline</v-icon
          >
        </v-fab-transition>
        <v-fab-transition>
          <v-icon style="position: absolute" v-show="tag.state === 1" v-on="on"
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
      if (this.tag.state === 0) return "屏蔽"
      else return "解锁"
    }
  },
  methods: {
    async block() {
      const result = await tagBlackHoleService.block(this.tag.name)
      await this.$resultNotify(result)
      this.$emit("block", { detail: this.tag, state: result.data })
    }
  }
}
</script>

<style scoped></style>
