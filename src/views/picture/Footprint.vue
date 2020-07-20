<template>
  <div>
    <v-card-text v-if="currPage" class="pa-0">
      <user-list-container-normal
        :page="currPage"
        :pageable="pageable"
        :loading="loading"
        @change="changePage"
        @follow="follow"
      >
        <v-row class="ma-0" justify="center" align="center">
          <v-col cols="12" sm="7" md="5" lg="4" xl="3" class="pa-0">
            <tips-page-card
              :icon="$constant.EMPTY_TIP_DETAIL_LIST.pictureFootprint.icon"
              :title="
                $internationalization[
                  $constant.EMPTY_TIP_DETAIL_LIST.pictureFootprint.title
                ]
              "
              :text="
                $internationalization[
                  $constant.EMPTY_TIP_DETAIL_LIST.pictureFootprint.text
                ]
              "
              :btn-desc="
                $internationalization[
                  $constant.EMPTY_TIP_DETAIL_LIST.pictureFootprint.btnDesc
                ]
              "
              :to="$constant.EMPTY_TIP_DETAIL_LIST.pictureFootprint.to + id"
            ></tips-page-card>
          </v-col>
        </v-row>
      </user-list-container-normal>
    </v-card-text>
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
  async created() {
    this.init()
  },
  props: {
    id: {
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
      pageable: new Pageable(0, 16, "lastModifiedDate,desc"),
      currPage: null
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    ...mapState("menu", ["mode"])
  },
  components: {
    "corner-buttons": () => import("../../components/page/CornerButtons"),
    "tips-page-card": () => import("../../components/page/TipsPageCard"),
    "user-list-container-normal": () =>
      import("../../components/page/UserListContainerNormal")
  },
  methods: {
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      await this.paging(this.page, this.id)
      this.MUpdateProgress(false)
    },
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.id)
      } else {
        this.$router.push(
          `/picture/${encodeURIComponent(this.id)}/footprint/${page}`
        )
      }
    },
    async paging(pageIndex, pictureId) {
      if (
        !pictureId ||
        this.loading ||
        (this.currPage?.last && this.currPage.number <= pageIndex - 1)
      ) {
        return
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      this.loading = true
      const result = await footprintService.pagingUser(this.pageable, pictureId)
      this.loading = false
      await this.$resultNotify(result)
      this.currPage = result.data
    },
    follow({ detail, focus }) {
      let row = this.currPage.content.find((it) => it.id === detail.id)
      row.focus = focus
    }
  }
}
</script>

<style lang="scss" scoped></style>
