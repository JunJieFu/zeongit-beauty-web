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
            :icon="$constant.EMPTY_TIP_ICON.search"
            :title="$vuetify.lang.t('$vuetify.emptyTip.title.search')"
            :text="$vuetify.lang.t('$vuetify.emptyTip.text.search')"
          ></tips-page-card>
        </v-col>
      </v-row>
    </component>
    <corner-buttons>
      <v-dialog :max-width="450" v-model="queryDialogVisible">
        <template v-slot:activator="{ on }">
          <v-btn fab :small="$vuetify.breakpoint.xsOnly" v-on="on">
            <v-icon>mdi-tune</v-icon>
          </v-btn>
        </template>
        <tune
          :input="form"
          @query="query"
          @close="queryDialogVisible = false"
        ></tune>
      </v-dialog>
    </corner-buttons>
  </div>
</template>

<script>
import { pictureService } from "@/assets/script/service"
import { Pageable } from "@/plugins/zg/script/model/main"
import { mapState } from "vuex"
import alivePageMixin from "@/plugins/zg/script/mixin/alivePage"
import * as qs from "qs"
import { QueryForm } from "@/views/search/script/model"

export default {
  props: {
    page: {
      type: [String, Number],
      default: 1
    },
    tagList: {
      type: [String, undefined],
      default: undefined
    }
  },
  mixins: [alivePageMixin],
  async created() {
    this.init()
  },
  data() {
    return {
      loading: false,
      pageable: new Pageable(),
      page2d: [],
      currPage: null,
      queryDialogVisible: false,
      form: new QueryForm(this.$route.query)
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
    "corner-buttons": () => import("@/components/page/CornerButtons"),
    tune: () => import("./components/Tune")
  },
  methods: {
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      await this.paging(this.page, this.tagList)
      this.MUpdateProgress(false)
    },
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.tagList)
      } else {
        this.$router.push(
          `/search/${encodeURIComponent(this.tagList)}/${page}?${qs.stringify(
            this.form
          )}`
        )
      }
    },
    async paging(pageIndex, tagList = this.tagList) {
      if (
        this.loading ||
        (this.currPage?.last && this.currPage.number <= pageIndex - 1)
      ) {
        return
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      if (tagList !== this.tagList || this.pageable.page === 1) {
        window.scrollTo(0, 0)
      }
      this.loading = true
      const result = await pictureService.paging(
        this.pageable,
        tagList,
        this.form
      )
      this.loading = false
      await this.$resultNotify(result)
      if (tagList !== this.tagList || this.pageable.page === 1) {
        this.page2d = []
      }
      const page = result.data
      this.currPage = result.data
      this.page2d.length = this.pageable.page
      //由于是数组必须用set
      this.$set(this.page2d, page.number, page)
    },
    query(form) {
      this.form = form
      this.changePage(0)
    }
  }
}
</script>

<style lang="scss" scoped></style>
