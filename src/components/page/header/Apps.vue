<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom :disabled="$isMobile">
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            depressed
            icon
            :small="$vuetify.breakpoint.xsOnly"
            v-on="Object.assign(menu, tooltip)"
            class="ml-2"
          >
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>
        <span>应用</span>
      </v-tooltip>
    </template>
    <apps-card :info="info"></apps-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex"

export default {
  components: {
    "apps-card": () => import("@/plugins/zg/components/AppsCard/Index")
  },
  computed: {
    ...mapState("user", ["info"])
  }
}
</script>

<style scoped lang="scss">
@import "src/plugins/zg/style/color";
.iframe-menu {
  max-width: 100%;
  $size: 380px;
  width: $size;
}
.link {
  color: currentColor;
}
</style>
