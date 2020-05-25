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
    <corner-buttons> </corner-buttons>
  </div>
</template>

<script>
import { pictureService } from "../../assets/script/service"
import { Pageable } from "../../assets/script/model"
import { mapState } from "vuex"

export default {
  data() {
    return {
      loading: false,
      pageable: new Pageable(0, 16),
      page2d: [],
      currPage: null,
      keyword: null
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
  async beforeRouteEnter(to, from, next) {
    window.app.$store?.commit("menu/MUpdateProgress", true)
    const pageable = new Pageable(to.params.page, 16)
    const keyword = to.params.keyword
    const result = await pictureService.paging(pageable, keyword)
    window.app.$store?.commit("menu/MUpdateProgress", false)
    next((vm) => {
      vm.pageable = pageable
      vm.keyword = keyword
      vm.structure(result.data, vm.pageable)
    })
  },
  async beforeRouteUpdate(to, from, next) {
    window.app.$store?.commit("menu/MUpdateProgress", true)
    this.paging(to.params.page, to.params.keyword)
    window.app.$store?.commit("menu/MUpdateProgress", false)
    next()
  },
  methods: {
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.keyword)
      } else {
        this.$router.push(`/search/${encodeURI(this.keyword)}/${page}`)
      }
    },
    async paging(pageIndex, keyword = this.keyword) {
      if (
        this.loading ||
        (this.currPage.last && this.currPage.number <= pageIndex - 1)
      ) {
        return
      }
      if (keyword !== this.keyword) {
        window.scrollTo(0, 0)
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      if (
        this.page2d[this.pageable.page - 1]?.content?.length &&
        keyword === this.keyword
      ) {
        this.currPage = this.page2d[this.pageable.page - 1]
      } else {
        this.loading = true
        const result = await pictureService.paging(this.pageable, keyword)
        this.loading = false
        await this.$resultNotify(result)
        if (keyword !== this.keyword) {
          this.keyword = keyword
          this.page2d = []
        }
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
