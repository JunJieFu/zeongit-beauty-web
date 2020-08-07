<template>
  <v-app>
    <alert></alert>
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
    alert: () => import("./Alert"),
    confirm: () => import("./Confirm"),
    prompt: () => import("./Prompt")
  }
}
</script>

<style scoped></style>
