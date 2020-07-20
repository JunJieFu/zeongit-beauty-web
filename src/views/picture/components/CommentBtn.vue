<template>
  <v-tooltip bottom :disabled="$isMobile">
    <template v-slot:activator="{ on }">
      <v-btn
        fab
        text
        :x-small="$vuetify.breakpoint.xsOnly"
        v-on="on"
        class="mx-2"
      >
        <v-icon>mdi-message-outline</v-icon>
      </v-btn>
    </template>
    <span>评论</span>
  </v-tooltip>
</template>

<script>
export default {}
</script>

<style scoped></style>
