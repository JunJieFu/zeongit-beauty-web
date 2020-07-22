<template>
  <v-avatar :size="size" v-if="info && info.avatarUrl">
    <v-img
      :src="$imageUrl.avatar(info.avatarUrl, type)"
      :aspect-ratio="1"
      :width="size"
    />
  </v-avatar>
  <v-avatar :size="size" v-else-if="info && info.nickname" color="info">
    <span
      class="white--text headline"
      :style="{ fontSize: size * 0.4 + `px !important` }"
      >{{ info.nickname.substr(0, 1) }}</span
    >
  </v-avatar>
  <v-avatar :size="size" v-else>
    <v-img :src="$imageUrl.avatar()" :aspect-ratio="1" :width="size" />
  </v-avatar>
</template>

<script>
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
  }
}
</script>

<style scoped></style>
