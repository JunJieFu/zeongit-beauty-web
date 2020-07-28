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
          <tips-page-card
            :icon="$constant.EMPTY_TIP_DETAIL_LIST.followingNew.icon"
            :title="
              $internationalization[
                $constant.EMPTY_TIP_DETAIL_LIST.followingNew.title
              ]
            "
            :text="
              $internationalization[
                $constant.EMPTY_TIP_DETAIL_LIST.followingNew.text
              ]
            "
            :btn-desc="
              $internationalization[
                $constant.EMPTY_TIP_DETAIL_LIST.followingNew.btnDesc
              ]
            "
            :to="$constant.EMPTY_TIP_DETAIL_LIST.followingNew.to"
          ></tips-page-card>
        </v-col>
      </v-row>
    </component>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { pictureService } from "../../assets/script/service"
import { Pageable } from "@/plugins/zg/script/model/main"
import { mapState } from "vuex"
import alivePageMixin from "@/plugins/zg/script/mixin/alivePage"

export default {
  mixins: [alivePageMixin],
  components: {
    "list-container-waterfall": () =>
      import("../../components/page/ListContainerWaterfall"),
    "list-container-normal": () =>
      import("../../components/page/ListContainerNormal"),
    "tips-page-card": () => import("../../components/page/TipsPageCard"),
    "corner-buttons": () => import("../../components/page/CornerButtons")
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
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.realTargetId)
      } else {
        this.$router.push(
          `/followingNew/${encodeURIComponent(this.realTargetId)}/${page}`
        )
      }
    },
    async paging(pageIndex, targetId = this.realTargetId) {
      if (
        !targetId ||
        this.loading ||
        (this.currPage?.last && this.currPage.number <= pageIndex - 1)
      ) {
        return
      }
      if (targetId !== this.realTargetId) {
        window.scrollTo(0, 0)
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      this.loading = true
      const result = await pictureService.pagingByFollowing(
        this.pageable,
        targetId
      )
      this.loading = false
      await this.$resultNotify(result)
      if (targetId !== this.realTargetId) {
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
