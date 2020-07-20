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
            :icon="$constant.EMPTY_TIP_DETAIL_LIST.works.icon"
            :title="
              $internationalization[$constant.EMPTY_TIP_DETAIL_LIST.works.title]
            "
            :text="
              $internationalization[$constant.EMPTY_TIP_DETAIL_LIST.works.text]
            "
            :btn-desc="
              $internationalization[
                $constant.EMPTY_TIP_DETAIL_LIST.works.btnDesc
              ]
            "
            :to="$constant.EMPTY_TIP_DETAIL_LIST.works.to"
          ></empty-picture-list-card>
        </v-col>
      </v-row>
    </component>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { worksService } from "../../assets/script/service"
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
      pageable: new Pageable(0, 16, "createDate,desc"),
      page2d: [],
      currPage: null
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    ...mapState("menu", ["mode"]),
    self() {
      return !this.targetId || this.$store.state.user.info.id === this.targetId
    }
  },
  methods: {
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      await this.paging(this.page, this.targetId || this.info?.id)
      this.MUpdateProgress(false)
    },
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.targetId || this.info?.id)
      } else {
        this.$router.push(
          `/works/${encodeURIComponent(this.targetId || this.info?.id)}/${page}`
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
      const result = await worksService.paging(this.pageable, targetId)
      this.loading = false
      await this.$resultNotify(result)
      if (targetId !== this.targetId) {
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
