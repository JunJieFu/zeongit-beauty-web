<!--这里因为用在v-speed-dial上，所以逻辑不能在这里实现，逻辑移到上层代码，这里只作点击-->
<template>
  <v-btn fab :small="$vuetify.breakpoint.xsOnly" @click="$emit('click')">
    <v-tooltip top :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-icon
            color="warning"
            style="position: absolute"
            v-show="picture.privacy === 0"
            v-on="on"
            >mdi-eye-off-outline
          </v-icon>
        </v-fab-transition>
        <v-fab-transition>
          <v-icon
            color="warning"
            style="position: absolute"
            v-show="picture.privacy === 1"
            v-on="on"
            >mdi-eye-outline
          </v-icon>
        </v-fab-transition>
      </template>
      <span>{{ privacyValue }}图片</span>
    </v-tooltip>
  </v-btn>
</template>

<script>
export default {
  props: {
    picture: {
      type: Object,
      required: true
    }
  },
  computed: {
    privacyValue() {
      if (this.picture.privacy === 0) return 1
      else return 0
    }
  }
}
</script>

<style scoped></style>
