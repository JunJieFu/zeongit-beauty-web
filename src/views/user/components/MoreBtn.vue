<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on: onMenu }">
      <v-tooltip bottom :disabled="$isMobile">
        <template v-slot:activator="{ on: onTooltip }">
          <v-btn
            fab
            text
            class="mx-2"
            :x-small="$vuetify.breakpoint.xsOnly"
            v-on="Object.assign(onTooltip, onMenu)"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <span>更多</span>
      </v-tooltip>
    </template>
    <v-list
      :dense="$vuetify.breakpoint.smAndDown"
      :width="$constant.MENU_LIST_WIDTH"
      v-if="info"
    >
      <v-list-item>
        <v-list-item-content>
          屏蔽
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          举报
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <sign-in-menu-card
      :title="$vuetify.lang.t('$vuetify.signInTip.title.moreBtn')"
      :text="$vuetify.lang.t('$vuetify.signInTip.text.moreBtn')"
      v-else
    ></sign-in-menu-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex"

export default {
  components: {
    "sign-in-menu-card": () => import("@/components/page/SignInMenuCard")
  },
  computed: {
    ...mapState("user", ["info"])
  }
}
</script>

<style scoped></style>
