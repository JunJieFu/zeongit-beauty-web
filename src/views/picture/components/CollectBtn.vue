<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        fab
        text
        :x-small="$vuetify.breakpoint.xsOnly"
        v-on="on"
        class="mx-2"
      >
        <v-icon
          color="error"
          v-if="picture.focus === $enum.CollectState.CONCERNED.key"
          >mdi-star</v-icon
        >
        <v-icon v-else>mdi-star-outline</v-icon>
      </v-btn>
    </template>
    <span>收藏</span>
  </v-tooltip>
</template>

<script>
import { NOOP } from "../../../assets/script/constant"

export default {
  props: {
    picture: {
      type: Object,
      default: NOOP
    }
  }
}
</script>

<style scoped></style>
