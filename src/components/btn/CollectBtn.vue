<template>
  <v-menu offset-y :disabled="!!info">
    <template v-slot:activator="{ on: onMenu }">
      <v-tooltip bottom :disabled="$isMobile">
        <template v-slot:activator="{ on: onTooltip }">
          <v-btn
            fab
            text
            :x-small="$vuetify.breakpoint.xsOnly"
            v-on="Object.assign(onTooltip, onMenu)"
            @click="onClick"
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
    <sign-in-menu-card
      :title="$internationalization.COLLECT_SIGN_IN_TITLE"
      :text="$internationalization.COLLECT_SIGN_IN_TEXT"
    ></sign-in-menu-card>
  </v-menu>
</template>

<script>
import { NOOP } from "@/plugins/zg/script/constant/main"
import { mapState } from "vuex"
import { collectionService } from "../../assets/script/service"

export default {
  props: {
    picture: {
      type: Object,
      default: NOOP
    }
  },
  components: {
    "sign-in-menu-card": () => import("../page/SignInMenuCard")
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    async onClick() {
      if (this.info) {
        const result = await collectionService.focus(this.picture.id)
        await this.$resultNotify(result)
        this.$emit("collect", { detail: this.picture, focus: result.data })
      }
    }
  }
}
</script>

<style scoped></style>
