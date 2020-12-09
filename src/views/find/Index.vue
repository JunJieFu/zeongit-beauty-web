<template>
  <div>
    <component
      :is="$enum.ListModeComponentName[mode]"
      :list="page2d.map((it) => it.items).flat()"
      :page="currPage"
      :pageable="pageable"
      :loading="loading"
      @change="changePage"
    >
      <v-row class="ma-0" justify="center" align="center">
        <v-col cols="12" sm="7" md="5" lg="4" xl="3">
          <tips-page-card
            :icon="$constant.EMPTY_TIP_ICON.find"
            :title="$vuetify.lang.t('$vuetify.emptyTip.title.find')"
            :text="$vuetify.lang.t('$vuetify.emptyTip.text.find')"
            :btn-desc="$vuetify.lang.t('$vuetify.emptyTip.btnDesc.find')"
            to="/feedback"
          ></tips-page-card>
        </v-col>
      </v-row>
    </component>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { pictureService } from "@/assets/script/service"
import { Pageable } from "@/plugins/zg/script/model/main"
import { mapState } from "vuex"
import alivePageMixin from "@/plugins/zg/script/mixin/alivePage"

export default {
  mixins: [alivePageMixin],
  async created() {
    this.init()
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
      pageable: new Pageable(),
      page2d: [],
      currPage: null
    }
  },
  computed: {
    ...mapState("menu", ["mode"])
  },
  components: {
    "list-container-waterfall": () =>
      import("@/components/page/ListContainerWaterfall"),
    "list-container-normal": () =>
      import("@/components/page/ListContainerNormal"),
    "tips-page-card": () => import("@/components/page/TipsPageCard"),
    "corner-buttons": () => import("@/components/page/CornerButtons")
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
      if (this.mode === 0) {
        this.paging(page)
      } else {
        this.$router.push(`/find/${page}`)
      }
    },
    async paging(pageIndex) {
      const last =
        this.currPage &&
        this.currPage.meta.totalPages <= this.currPage?.meta.currentPage

      if (
        this.loading ||
        (last && this.currPage?.meta.currentPage <= pageIndex)
      ) {
        return
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      this.loading = true
      const result = await pictureService.pagingByRecommend(this.pageable)
      this.loading = false
      await this.$resultNotify(result)
      const page = result.data
      this.currPage = result.data
      this.page2d.length = this.pageable.page
      //由于是数组必须用set
      this.$set(this.page2d, page.meta.currentPage, page)
    }
  }
}
</script>

<style lang="scss" scoped></style>
