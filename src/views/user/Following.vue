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
              :icon="$constant.EMPTY_TIP_ICON.following"
              :title="$vuetify.lang.t('$vuetify.emptyTip.title.following')"
            ></tips-page-card>
          </v-col>
        </v-row>
      </user-list-container-normal>
    </v-card-text>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { userService } from "@/assets/script/service"
import { Pageable } from "@/plugins/zg/script/model/main"
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
      import("@/components/page/UserListContainerNormal")
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
      currPage: null,
      pageable: new Pageable()
    }
  },
  computed: {
    ...mapState("user", ["info"]),
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
          `/following/${encodeURIComponent(this.realTargetId)}/${page}`
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
      const result = await userService.pagingFollowing(this.pageable, targetId)
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
