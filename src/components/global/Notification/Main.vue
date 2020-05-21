<template>
  <v-snackbar
    v-model="visible"
    :absolute="absolute"
    :bottom="bottom"
    :color="color"
    :left="left"
    :multiLine="multiLine"
    :right="right"
    :timeout="timeout"
    :top="top"
    :vertical="vertical"
  >
    {{ text }}
    <v-btn text fab dark small @click="visible = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      absolute: false,
      bottom: false,
      color: undefined,
      left: false,
      multiLine: false,
      right: true,
      timeout: 6000,
      top: true,
      visible: false,
      vertical: false,
      text: undefined
    }
  }
}
</script>

<style lang="scss" scoped></style>
