<template>
  <v-app>
    <notify></notify>
    <confirm></confirm>
    <prompt></prompt>
    <slot></slot>
  </v-app>
</template>

<script>
export default {
  components: {
    notify: () => import("./Notify"),
    confirm: () => import("./Confirm"),
    prompt: () => import("./Prompt")
  }
}
</script>

<style scoped></style>
