<template>
  <div>
    <v-card-text v-if="currPage" class="pa-0">
      <user-list-container-normal
        :page="currPage"
        :pageable="pageable"
        :loading="loading"
        @change="changePage"
        @follow="follow"
      ></user-list-container-normal>
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
    "user-list-container-normal": () =>
      import("../../components/page/UserListContainerNormal")
  },
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      currPage: null,
      pageable: new Pageable(0, 2, "createDate,desc")
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
      await this.paging(
        this.$route.params.page,
        this.$route.params.targetId || this.info.id
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
        this.$router.push(`/following/${encodeURI(this.targetId)}/${page}`)
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
