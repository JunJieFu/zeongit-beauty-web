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
    <go-top-fab></go-top-fab>
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
      pageable: new Pageable(0, 16, "createDate,desc"),
      page2d: [],
      currPage: null,
      targetId: null
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
    "go-top-fab": () => import("../../components/page/GoTopFab")
  },
  async beforeRouteEnter(to, from, next) {
    window.app.$store?.commit("menu/MUpdateProgress", true)
    const pageable = new Pageable(to.params.page, 16, "createDate,desc")
    const targetId = to.params.targetId
    const result = await pictureService.paging(pageable, undefined, targetId)
    window.app.$store?.commit("menu/MUpdateProgress", false)
    next((vm) => {
      vm.pageable = pageable
      vm.targetId = targetId
      vm.structure(result.data, vm.pageable)
    })
  },
  async beforeRouteUpdate(to, from, next) {
    window.app.$store?.commit("menu/MUpdateProgress", true)
    this.paging(to.params.page, to.params.targetId)
    window.app.$store?.commit("menu/MUpdateProgress", false)
    next()
  },
  methods: {
    changePage(page) {
      if (this.pageable.page === page) {
        return
      }
      if (this.mode === this.$enum.ListMode.WATERFALL.key) {
        this.paging(page, this.targetId)
      } else {
        this.$router.push(`/works/${encodeURI(this.targetId)}/${page}`)
      }
    },
    async paging(pageIndex, targetId = this.targetId) {
      if (
        this.loading ||
        (this.currPage.last && this.currPage.number <= pageIndex - 1)
      ) {
        return
      }
      if (targetId !== this.targetId) {
        window.scrollTo(0, 0)
      }
      this.pageable.page = parseInt(pageIndex || 1) || 1
      if (
        this.page2d[this.pageable.page - 1]?.content?.length &&
        targetId === this.targetId
      ) {
        this.currPage = this.page2d[this.pageable.page - 1]
      } else {
        this.loading = true
        const result = await pictureService.paging(
          this.pageable,
          undefined,
          targetId
        )
        this.loading = false
        await this.$resultNotify(result)
        if (targetId !== this.targetId) {
          this.targetId = targetId
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
