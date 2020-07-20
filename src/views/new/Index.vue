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
            :icon="$constant.EMPTY_TIP_DETAIL_LIST.new.icon"
            :title="
              $internationalization[$constant.EMPTY_TIP_DETAIL_LIST.new.title]
            "
            :text="
              $internationalization[$constant.EMPTY_TIP_DETAIL_LIST.new.text]
            "
            :btn-desc="
              $internationalization[$constant.EMPTY_TIP_DETAIL_LIST.new.btnDesc]
            "
            :to="$constant.EMPTY_TIP_DETAIL_LIST.new.to"
          ></empty-picture-list-card>
        </v-col>
      </v-row>
    </component>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { pictureService } from "../../assets/script/service"
import { Pageable } from "../../assets/script/model"
import { mapState } from "vuex"
import alivePageMixin from "../../assets/script/mixin/alivePage"

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
      pageable: new Pageable(0, 16, "createDate,desc"),
      page2d: [],
      currPage: null
    }
  },
  computed: {
    ...mapState("menu", ["mode"])
  },
  components: {
    "list-container-waterfall": () =>
      import("../../components/page/ListContainerWaterfall"),
    "list-container-normal": () =>
      import("../../components/page/ListContainerNormal"),
    "empty-picture-list-card": () =>
      import("../../components/page/EmptyPictureListCard"),
    "corner-buttons": () => import("../../components/page/CornerButtons")
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
        this.paging(page)
      } else {
        this.$router.push(`/new/${page}`)
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
      const result = await pictureService.paging(this.pageable)
      this.loading = false
      await this.$resultNotify(result)
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
