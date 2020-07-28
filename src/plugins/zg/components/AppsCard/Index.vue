<template>
  <v-card class="iframe-menu">
    <v-row class="mx-0">
      <v-col :cols="4">
        <a
          :href="$config.ACCOUNT_HOST"
          target="_blank"
          class="d-flex flex-column align-center flex-xl-grow-1 link"
        >
          <avatar :info="info" size="50"></avatar>
          <span class="ellipsis font-weight-thin">Zeongit 账号</span>
        </a>
      </v-col>
      <v-col :cols="4">
        <a
          :href="$config.BEAUTY_HOST"
          target="_blank"
          class="d-flex flex-column align-center flex-xl-grow-1 link"
        >
          <v-img
            src="@/plugins/zg/image/beauty.svg"
            class="rounded-circle"
            :aspect-ratio="1"
            width="50"
          ></v-img>
          <span class="ellipsis font-weight-thin">Beauty</span>
        </a>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/color";
.iframe-menu {
  max-width: 100%;
  $size: 380px;
  width: $size;
  .link {
    color: currentColor;
  }
}
</style>
