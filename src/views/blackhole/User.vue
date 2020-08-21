<template>
  <div>
    <v-card-text v-if="currPage" class="pa-0">
      <user-list-container-normal
        :page="currPage"
        :pageable="pageable"
        :loading="loading"
        @change="changePage"
        @block="block"
      >
        <v-row class="ma-0" justify="center" align="center">
          <v-col cols="12" sm="7" md="5" lg="4" xl="3" class="pa-0">
            <tips-page-card
              :icon="$constant.EMPTY_TIP_ICON.blackHole"
              :title="$vuetify.lang.t('$vuetify.emptyTip.title.blackHoleUser')"
            ></tips-page-card>
          </v-col>
        </v-row>
      </user-list-container-normal>
    </v-card-text>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { Pageable } from "@/plugins/zg/script/model/main"
import { userBlackHoleService } from "@/assets/script/service"
import alivePageMixin from "@/plugins/zg/script/mixin/alivePage"

export default {
  mixins: [alivePageMixin],
  async created() {
    this.init()
  },
  components: {
    "corner-buttons": () => import("@/components/page/CornerButtons"),
    "tips-page-card": () => import("@/components/page/TipsPageCard"),
    "user-list-container-normal": () =>
      import("./components/UserListContainerNormal")
  },
  props: {
    page: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      loading: false,
      currPage: null,
      pageable: new Pageable()
    }
  },
  methods: {
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      await this.paging(this.page)
      this.MUpdateProgress(false)
    },
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.realTargetId)
      } else {
        this.$router.push(`/blackHole/user/${page}`)
      }
    },
    async paging(pageIndex) {
      if (
        this.loading ||
        (this.currPage?.last && this.currPage.number <= pageIndex - 1)
      ) {
        return
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      this.loading = true
      const result = await userBlackHoleService.paging(this.pageable)
      this.loading = false
      await this.$resultNotify(result)
      this.currPage = result.data
    },
    block({ detail, state }) {
      let row = this.currPage.content.find((it) => it.id === detail.id)
      row.state = state
    }
  }
}
</script>

<style lang="scss" scoped></style>
