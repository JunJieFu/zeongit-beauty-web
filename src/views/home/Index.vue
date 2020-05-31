<template>
  <v-card
    :elevation="0"
    :max-width="$constant.LIST_ITEM_WIDTH * 5 + $constant.DETAIL_GAP * 2"
    class="mx-auto"
  >
    <v-card-title v-if="followingPictureList.length" class="justify-center">
      已关注用户的作品
    </v-card-title>
    <v-card-text class="px-0">
      <list-container :list="followingPictureList"></list-container>
    </v-card-text>
    <v-divider v-if="followingPictureList.length"></v-divider>
    <v-card-title v-if="findList.length" class="justify-center">
      推荐作品
    </v-card-title>
    <v-card-text class="px-0">
      <list-container :list="findList"></list-container>
    </v-card-text>
    <v-divider v-if="findList.length"></v-divider>
    <v-card-title v-if="newList.length" class="justify-center">
      最新作品
    </v-card-title>
    <v-card-text class="px-0">
      <list-container :list="newList"></list-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { Pageable } from "../../assets/script/model"
import { pictureService } from "../../assets/script/service"
import { mapState } from "vuex"

export default {
  components: {
    "list-container": () => import("../../components/page/ListContainer")
  },
  created() {
    this.init()
  },
  data: function() {
    return {
      pageable: new Pageable(0, 10, "createDate,desc"),
      followingPictureList: [],
      findList: [],
      newList: []
    }
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    init() {
      this.pagingByFollowing()
      this.pagingByRecommend()
      this.paging()
    },
    async pagingByFollowing() {
      if (this.info) {
        const result = await pictureService.pagingByFollowing(this.pageable)
        this.followingPictureList = result?.data?.content || []
      }
    },
    async pagingByRecommend() {
      const result = await pictureService.pagingByRecommend(this.pageable)
      this.findList = result?.data?.content || []
    },
    async paging() {
      const result = await pictureService.paging(this.pageable)
      this.newList = result?.data?.content || []
    }
  }
}
</script>

<style scoped></style>
