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
            :icon="$constant.EMPTY_TIP_ICON.collection"
            :title="$vuetify.lang.t('$vuetify.emptyTip.title.collection')"
            :text="$vuetify.lang.t('$vuetify.emptyTip.text.collection')"
            :btn-desc="$vuetify.lang.t('$vuetify.emptyTip.btnDesc.collection')"
            to="/find"
          ></tips-page-card>
        </v-col>
      </v-row>
    </component>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { collectionService } from "@/assets/script/service"
import { Pageable } from "@/plugins/zg/script/model/main"
import { mapState } from "vuex"
import alivePageMixin from "@/plugins/zg/script/mixin/alivePage"

export default {
  mixins: [alivePageMixin],
  components: {
    "list-container-waterfall": () =>
      import("@/components/page/ListContainerWaterfall"),
    "list-container-normal": () =>
      import("@/components/page/ListContainerNormal"),
    "tips-page-card": () => import("@/components/page/TipsPageCard"),
    "corner-buttons": () => import("@/components/page/CornerButtons")
  },
  async created() {
    this.init()
  },
  props: {
    targetId: {
      type: [String, null, undefined],
      default: undefined
    },
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
    ...mapState("user", ["info"]),
    ...mapState("menu", ["mode"]),
    realTargetId() {
      return this.targetId || this.info?.id
    }
  },
  methods: {
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      await this.paging(this.page, this.realTargetId)
      this.MUpdateProgress(false)
    },
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === 0) {
        this.paging(page, this.realTargetId)
      } else {
        this.$router.push(
          `/collection/${encodeURIComponent(this.realTargetId)}/${page}`
        )
      }
    },
    async paging(pageIndex, targetId = this.realTargetId) {
      const last =
        this.currPage &&
        this.currPage.meta.totalPages <= this.currPage?.meta.currentPage
      if (
        !targetId ||
        this.loading ||
        (last && this.currPage?.meta.currentPage <= pageIndex)
      ) {
        return
      }
      if (targetId !== this.realTargetId) {
        window.scrollTo(0, 0)
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      this.loading = true
      const result = await collectionService.paging(this.pageable, targetId)
      this.loading = false
      await this.$resultNotify(result)
      if (targetId !== this.realTargetId) {
        this.page2d = []
      }
      //临时处理
      const data = {
        meta: result.data.meta,
        items: result.data.items.map(
          (item) => item.picture ?? { id: item.pictureId }
        )
      }
      const page = data
      this.currPage = data
      this.page2d.length = this.pageable.page
      //由于是数组必须用set
      this.$set(this.page2d, page.meta.currentPage, page)
    }
  }
}
</script>

<style lang="scss" scoped></style>
