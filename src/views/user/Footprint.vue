<template>
  <div>
    <component
      :is="$enum.ListModeComponentName[mode].value"
      :list="page2d.map((it) => it.content).flat()"
      :page="currPage"
      :pageable="pageable"
      :loading="loading"
      @change="changePage"
    >
      <v-row class="ma-0" justify="center" align="center">
        <v-col cols="12" sm="7" md="5" lg="4" xl="3">
          <empty-picture-list-card
            :icon="$constant.EMPTY_TIP_DETAIL_LIST.footprint.icon"
            :title="
              $internationalization[
                $constant.EMPTY_TIP_DETAIL_LIST.footprint.title
              ]
            "
            :text="
              $internationalization[
                $constant.EMPTY_TIP_DETAIL_LIST.footprint.text
              ]
            "
            :btn-desc="
              $internationalization[
                $constant.EMPTY_TIP_DETAIL_LIST.footprint.btnDesc
              ]
            "
            :to="$constant.EMPTY_TIP_DETAIL_LIST.footprint.to"
          ></empty-picture-list-card>
        </v-col>
      </v-row>
    </component>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { footprintService } from "../../assets/script/service"
import { Pageable } from "../../assets/script/model"
import { mapState } from "vuex"
import alivePageMixin from "../../assets/script/mixin/alivePage"

export default {
  mixins: [alivePageMixin],
  components: {
    "list-container-waterfall": () =>
      import("../../components/page/ListContainerWaterfall"),
    "list-container-normal": () =>
      import("../../components/page/ListContainerNormal"),
    "empty-picture-list-card": () =>
      import("../../components/page/EmptyPictureListCard"),
    "corner-buttons": () => import("../../components/page/CornerButtons")
  },
  async created() {
    this.init()
  },
  data() {
    return {
      loading: false,
      pageable: new Pageable(0, 16, "lastModifiedDate,desc"),
      page2d: [],
      currPage: null,
      targetId: null
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    ...mapState("menu", ["mode"])
  },
  methods: {
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      await this.paging(
        this.$route.params.page,
        this.$route.params.targetId || this.info?.id
      )
      this.MUpdateProgress(false)
    },
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.targetId)
      } else {
        this.$router.push(
          `/footprint/${encodeURIComponent(this.targetId)}/${page}`
        )
      }
    },
    async paging(pageIndex, targetId = this.targetId) {
      if (
        !targetId ||
        this.loading ||
        (this.currPage?.last && this.currPage.number <= pageIndex - 1)
      ) {
        return
      }
      if (targetId !== this.targetId) {
        window.scrollTo(0, 0)
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      this.loading = true
      const result = await footprintService.paging(this.pageable, targetId)
      this.loading = false
      await this.$resultNotify(result)
      if (targetId !== this.targetId) {
        this.targetId = targetId
        this.page2d = []
      }
      const page = result.data
      this.currPage = result.data
      this.page2d.length = this.pageable.page
      //由于是数组必须用set
      this.$set(this.page2d, page.number, page)
    }
  }
}
</script>

<style lang="scss" scoped></style>
