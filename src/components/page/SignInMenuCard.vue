<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ text }}</v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-end">
      <v-btn outlined color="primary">登录</v-btn>
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
  }
}
</script>

<style scoped></style>
