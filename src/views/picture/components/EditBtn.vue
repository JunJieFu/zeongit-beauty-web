<!--这里因为用在v-speed-dial上，所以逻辑不能在这里实现，逻辑移到上层代码，这里只作点击-->
<template>
  <v-btn fab :small="$vuetify.breakpoint.xsOnly" @click="$emit('click')">
    <v-tooltip top :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-icon color="primary" v-on="on">mdi-image-edit-outline</v-icon>
      </template>
      <span>修改图片信息</span>
    </v-tooltip>
  </v-btn>
</template>

<script>
export default {}
</script>

<style scoped></style>
