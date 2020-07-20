<template>
  <v-btn fab :small="$vuetify.breakpoint.xsOnly" @click.stop="onClick">
    <v-tooltip top :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-icon color="primary" v-on="on">mdi-image-edit-outline</v-icon>
      </template>
      <span>修改图片信息</span>
    </v-tooltip>
  </v-btn>
</template>

<script>
export default {
  methods: {
    async onClick() {
      this.$emit("edit")
    }
  }
}
</script>

<style scoped></style>
