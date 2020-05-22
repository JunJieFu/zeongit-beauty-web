<template>
  <v-fab-transition>
    <v-btn
      fab
      color="white"
      fixed
      bottom
      right
      :small="$vuetify.breakpoint.xsOnly"
      @click="$vuetify.goTo(`#app`)"
      style="bottom: 12px;right: 12px"
      v-scroll="onScroll"
      v-show="show"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    onScroll({ target }) {
      const { documentElement } = target
      const scrollTop = documentElement.scrollTop
      this.show = scrollTop > 150
    }
  }
}
</script>

<style scoped></style>
