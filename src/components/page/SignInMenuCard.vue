<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ text }}</v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-end">
      <v-btn
        outlined
        color="primary"
        :href="
          `${$config.ACCOUNT_HOST}/signIn?continue=${encodeURIComponent(href)}`
        "
        >{{ $vuetify.lang.t(`$vuetify.signInTip.signIn`) }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
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
