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
            <empty-picture-list-card
              :icon="$constant.EMPTY_TIP_DETAIL_LIST.following.icon"
              :title="
                $internationalization[
                  $constant.EMPTY_TIP_DETAIL_LIST.following.title
                ]
              "
            ></empty-picture-list-card>
          </v-col>
        </v-row>
      </user-list-container-normal>
    </v-card-text>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { userService } from "../../assets/script/service"
import { Pageable } from "../../assets/script/model"
import alivePageMixin from "../../assets/script/mixin/alivePage"

export default {
  mixins: [alivePageMixin],
  async created() {
    this.init()
  },
  components: {
    "corner-buttons": () => import("../../components/page/CornerButtons"),
    "empty-picture-list-card": () =>
      import("../../components/page/EmptyPictureListCard"),
    "user-list-container-normal": () =>
      import("../../components/page/UserListContainerNormal")
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
      pageable: new Pageable(0, 16, "createDate,desc")
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    user() {
      return this.$parent.user
    }
  },
  methods: {
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      await this.paging(this.page, this.targetId || this.info.id)
      this.MUpdateProgress(false)
    },
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.targetId || this.info.id)
      } else {
        this.$router.push(
          `/following/${encodeURIComponent(
            this.targetId || this.info.id
          )}/${page}`
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
      const result = await userService.pagingFollowing(this.pageable, targetId)
      this.loading = false
      await this.$resultNotify(result)
      if (targetId !== this.targetId) {
        this.targetId = targetId
      }
      this.currPage = result.data
    },
    follow({ detail, focus }) {
      let row = this.currPage.content.find((it) => it.id === detail.id)
      row.focus = focus
    }
  }
}
</script>
