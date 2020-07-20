<template>
  <div class="corner-buttons">
    <div
      class="customize-buttons"
      :style="{
        transform: `translateY(${-bottom}px)`
      }"
    >
      <slot></slot>
    </div>
    <v-slide-y-reverse-transition>
      <v-btn
        fab
        :small="$vuetify.breakpoint.xsOnly"
        @click="$vuetify.goTo(`#app`)"
        v-scroll="onScroll"
        v-show="show"
      >
        <v-icon color="primary">mdi-arrow-up</v-icon>
      </v-btn>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>
import {
  CORNER_BUTTONS_GAP,
  DEFAULT_BTN_HEIGHT,
  SMALL_BTN_HEIGHT
} from "../../assets/script/constant"

export default {
  props: {
    heighten: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    bottom() {
      if (this.show && this.heighten) {
        if (this.$vuetify.breakpoint.xsOnly) {
          return SMALL_BTN_HEIGHT + CORNER_BUTTONS_GAP
        } else {
          return DEFAULT_BTN_HEIGHT + CORNER_BUTTONS_GAP
        }
      } else {
        return 0
      }
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

<style scoped lang="scss">
.corner-buttons {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 16px;
  right: 16px;
  .customize-buttons {
    transition: 0.3s;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
