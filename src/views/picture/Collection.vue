<template>
  <div>
    <v-card-text v-if="currPage" class="pa-0">
      <user-list-container-normal
        :page="currPage"
        :pageable="pageable"
        :loading="loading"
        @change="changePage"
      ></user-list-container-normal>
    </v-card-text>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { collectionService } from "../../assets/script/service"
import { Pageable } from "../../assets/script/model"
import { mapState } from "vuex"
import alivePageMixin from "../../assets/script/mixin/alivePage"

export default {
  mixins: [alivePageMixin],
  async created() {
    this.init()
  },
  data() {
    return {
      loading: false,
      pageable: new Pageable(0, 2, "lastModifiedDate,desc"),
      page2d: [],
      currPage: null,
      pictureId: null
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    ...mapState("menu", ["mode"])
  },
  components: {
    "corner-buttons": () => import("../../components/page/CornerButtons"),
    "user-list-container-normal": () =>
      import("../../components/page/UserListContainerNormal")
  },
  methods: {
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      await this.paging(this.$route.params.page, this.$route.params.id)
      this.MUpdateProgress(false)
    },
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.pictureId)
      } else {
        this.$router.push(
          `/picture/${encodeURI(this.pictureId)}/collection/${page}`
        )
      }
    },
    async paging(pageIndex, pictureId = this.pictureId) {
      if (
        !pictureId ||
        this.loading ||
        (this.currPage?.last && this.currPage.number <= pageIndex - 1)
      ) {
        return
      }
      if (pictureId !== this.pictureId) {
        window.scrollTo(0, 0)
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      this.loading = true
      const result = await collectionService.pagingUser(
        this.pageable,
        pictureId
      )
      this.loading = false
      await this.$resultNotify(result)
      if (pictureId !== this.pictureId) {
        this.pictureId = pictureId
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
