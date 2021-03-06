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
              :icon="$constant.EMPTY_TIP_ICON.pictureCollection"
              :title="
                $vuetify.lang.t('$vuetify.emptyTip.title.pictureCollection')
              "
              :text="
                $vuetify.lang.t('$vuetify.emptyTip.text.pictureCollection')
              "
              :btn-desc="
                $vuetify.lang.t('$vuetify.emptyTip.btnDesc.pictureCollection')
              "
              :to="`/picture/${id}`"
            ></tips-page-card>
          </v-col>
        </v-row>
      </user-list-container-normal>
    </v-card-text>
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
      pageable: new Pageable(),
      currPage: null
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    ...mapState("menu", ["mode"])
  },
  components: {
    "corner-buttons": () => import("@/components/page/CornerButtons"),
    "tips-page-card": () => import("@/components/page/TipsPageCard"),
    "user-list-container-normal": () =>
      import("@/components/page/UserListContainerNormal")
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
      if (this.mode === 0) {
        this.paging(page, this.id)
      } else {
        this.$router.push(
          `/picture/${encodeURIComponent(this.id)}/collection/${page}`
        )
      }
    },
    async paging(pageIndex, pictureId) {
      const last =
        this.currPage &&
        this.currPage.meta.totalPages <= this.currPage?.meta.currentPage
      if (
        !pictureId ||
        this.loading ||
        (last && this.currPage?.meta.currentPage <= pageIndex)
      ) {
        return
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      this.loading = true
      const result = await collectionService.pagingUser(
        this.pageable,
        pictureId
      )
      this.loading = false
      await this.$resultNotify(result)
      this.currPage = result.data
    },
    follow({ detail, focus }) {
      let row = this.currPage.items.find((it) => it.id === detail.id)
      row.focus = focus
    }
  }
}
</script>

<style lang="scss" scoped></style>
