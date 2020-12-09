<template>
  <v-avatar :size="size" v-if="info && info.avatar">
    <v-img
      :src="$imageUrl.avatar(info.avatar, type)"
      :aspect-ratio="1"
      :width="size"
    />
  </v-avatar>
  <v-avatar :size="size" v-else-if="info && !info.avatar" :color="color">
    <span
      class="white--text headline"
      :style="{ fontSize: size * 0.4 + `px !important` }"
      >{{ character }}</span
    >
  </v-avatar>
  <v-avatar :size="size" v-else>
    <v-img :src="$imageUrl.avatar()" :aspect-ratio="1" :width="size" />
  </v-avatar>
</template>

<script>
const avatarColorList = ["accent", "error", "info", "success", "warning"]
export default {
  props: {
    info: {
      type: [Object]
    },
    type: {
      type: [String],
      default: null
    },
    size: {
      type: [Number, String],
      default: 50
    }
  },
  computed: {
    character() {
      return this.info?.nickname?.substr(0, 1) || ""
    },
    color() {
      const index =
        (this.info?.nickname?.charCodeAt(0) || 2) % avatarColorList.length
      return avatarColorList[index]
    }
  }
}
</script>

<style scoped></style>
