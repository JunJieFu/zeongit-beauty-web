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
    <v-card class="iframe-menu">
      <v-row class="mx-0">
        <v-col :cols="4">
          <a
            :href="$config.accountHost"
            target="_blank"
            class="d-flex flex-column align-center flex-xl-grow-1 link"
          >
            <avatar :info="info" size="50"></avatar>
            <span class="ellipsis font-weight-thin">Zeongit 账号</span>
          </a>
        </v-col>
        <v-col :cols="4">
          <a
            :href="$config.beautyHost"
            target="_blank"
            class="d-flex flex-column align-center flex-xl-grow-1 link"
          >
            <v-img
              src="../../../assets/image/svg/beauty.svg"
              class="circle"
              :aspect-ratio="1"
              width="50"
            ></v-img>
            <span class="ellipsis font-weight-thin">Beauty</span>
          </a>
        </v-col>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState("user", ["info"])
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/style/color";
.iframe-menu {
  max-width: 100%;
  $size: 380px;
  width: $size;
}
.link {
  color: currentColor;
}
</style>
