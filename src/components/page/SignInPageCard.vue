<template>
  <v-card :elevation="0" class="mt-12 pt-12" color="transparent">
    <v-card-title class="justify-center">
      <v-icon size="100">{{ icon }}</v-icon>
    </v-card-title>
    <v-card-title class="justify-center">{{ title }} </v-card-title>
    <v-card-text class="text-center">
      {{ text }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn
        outlined
        color="primary"
        :href="
          `${$config.accountHost}/signIn?continue=${encodeURIComponent(href)}`
        "
        >登录</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  },
  computed: {
    href() {
      return window.location.href
    }
  }
}
</script>

<style scoped></style>
