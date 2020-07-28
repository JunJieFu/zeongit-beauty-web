<template>
  <v-row class="ma-0" justify="center" align="center">
    <v-col cols="12" sm="7" md="5" lg="4" xl="3">
      <tips-page-card
        icon="mdi-upload-outline"
        title="暂时还不能上传"
        text="作者很懒，不想写，或许以后会加上，未完待续..."
      ></tips-page-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    "tips-page-card": () => import("@/components/page/TipsPageCard")
  }
}
</script>

<style scoped></style>
