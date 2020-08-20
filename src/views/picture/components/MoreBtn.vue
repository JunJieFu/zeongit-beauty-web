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
      <v-dialog :max-width="$constant.BLOCK_DIALOG_MAX_WIDTH">
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-content>
              屏蔽
            </v-list-item-content>
          </v-list-item>
        </template>
        <block :picture="picture"></block>
      </v-dialog>
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

<script type="text/jsx">
import { mapState } from "vuex"
import { pictureService } from "@/assets/script/service"

export default {
  props: {
    picture: {
      type: [Object],
      required: true
    }
  },
  components: {
    "sign-in-menu-card": () => import("@/components/page/SignInMenuCard"),
    "block": () => import("./Block"),
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    async saveBlacklist() {
      console.log(await pictureService.getBlock(this.picture.id))
      // await this.$confirm({
      //   text: {
      //     render(){
      //       return (<div>您确定把该图片放进黑名单吗？<br />注意：进入黑名单的图片不再出现在搜索和推荐中！</div>)
      //     }
      //   }
      // })
      // const result = await pictureBlackHoleService.save(this.picture.id)
      // await this.$resultNotify(result )
      // this.$notify({text:"操作成功",color:"success"})
    }
  }
}
</script>

<style scoped></style>
