<template>
  <div>
    <component
      :is="$enum.ListModeComponentName[mode].value"
      :page2d="page2d"
      :list="page2d.map((it) => it.content).flat()"
      :page="currPage"
      :pageable="pageable"
      @change="changePage"
    ></component>
    <corner-buttons></corner-buttons>
  </div>
</template>

<script>
import { pictureService } from "../../assets/script/service"
import { Pageable } from "../../assets/script/model"
import { mapState } from "vuex"

export default {
  async created() {
    window.app.$store?.commit("menu/MUpdateProgress", true)
    await this.paging(this.$route.params.page)
    window.app.$store?.commit("menu/MUpdateProgress", false)
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
    "corner-buttons": () => import("../../components/page/CornerButtons")
  },
  methods: {
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
      if (this.page2d[this.pageable.page - 1]?.content?.length) {
        this.currPage = this.page2d[this.pageable.page - 1]
      } else {
        this.loading = true
        const result = await pictureService.paging(this.pageable)
        this.loading = false
        await this.$resultNotify(result)
        this.structure(result.data, this.pageable)
      }
    },
    structure(page, pageable) {
      this.currPage = page
      this.page2d.length = Math.min.apply(null, [
        pageable.page,
        this.page2d.length
      ])
      //由于是数组必须用set
      this.$set(this.page2d, page.number, page)
    }
  }
}
</script>

<style lang="scss" scoped></style>
