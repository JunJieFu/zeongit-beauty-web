<template>
  <div
    class="page mx-auto"
    :class="{
      'pa-4': !$vuetify.breakpoint.xsOnly
    }"
  >
    <v-card
      :outlined="$vuetify.breakpoint.xsOnly ? undefined : true"
      :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
      :tile="$vuetify.breakpoint.xsOnly"
    >
      <v-card-title>屏蔽设置</v-card-title>
      <v-tabs v-model="type">
        <v-tab to="/blackHole/user">用户</v-tab>
        <v-tab to="/blackHole/tag">标签</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <keep-alive :max="15">
        <router-view :key="decodeURI($route.fullPath)" />
      </keep-alive>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      type: ""
    }
  },
  computed: {
    ...mapState("user", ["info"])
  }
}
</script>

<style lang="scss" scoped>
@import "src/plugins/zg/style/config";
.page {
  max-width: $page-size;
}
</style>
