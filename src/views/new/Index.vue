<template>
  <div><list-container :list="list"></list-container></div>
</template>

<script>
import { pictureService } from "../../assets/script/service"
import { Pageable } from "../../assets/script/model"

export default {
  data() {
    return {
      pageable: new Pageable(0, 16, "createDate,desc"),
      list: []
    }
  },
  components: {
    "list-container": () => import("../../components/page/ListContainer")
  },
  async beforeRouteEnter(to, from, next) {
    window.app.$store?.commit("menu/MUpdateProgress", true)
    const pageable = new Pageable(0, 16, "createDate,desc")
    const result = await pictureService.paging(pageable)
    window.app.$store?.commit("menu/MUpdateProgress", false)
    next((vm) => {
      vm.list = result.data.content
      vm.pageable = pageable
    })
  }
}
</script>

<style lang="scss" scoped></style>
