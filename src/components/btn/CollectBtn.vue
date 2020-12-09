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
            <v-icon color="error" v-if="picture.focus === 1">mdi-star </v-icon>
            <v-icon v-else>mdi-star-outline</v-icon>
          </v-btn>
        </template>
        <span>收藏</span>
      </v-tooltip>
    </template>
    <sign-in-menu-card
      :title="$vuetify.lang.t('$vuetify.signInTip.title.collectBtn')"
      :text="$vuetify.lang.t('$vuetify.signInTip.text.collectBtn')"
    ></sign-in-menu-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex"
import { collectionService } from "@/assets/script/service"

export default {
  props: {
    picture: {
      type: [Object],
      required: true
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
