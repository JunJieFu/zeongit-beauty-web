<template>
  <div>
    <div
      class="mx-auto d-flex"
      v-resize="throttle"
      ref="page"
      style="max-width: 1120px;"
      :class="{
        'pa-4': !$vuetify.breakpoint.xsOnly,
        'flex-column': $vuetify.breakpoint.xsOnly
      }"
      v-if="picture"
    >
      <div class="flex-grow-1">
        <v-card
          :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
          :tile="$vuetify.breakpoint.xsOnly"
        >
          <v-img
            :src="
              $img.secdra(
                picture ? picture.url : undefined,
                `specifiedWidth1200`
              )
            "
            :contain="!$vuetify.breakpoint.xsOnly"
            :aspect-ratio="
              $vuetify.breakpoint.xsOnly ? picture.width / picture.height : 1
            "
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-text class="text-right">
            <comment-btn></comment-btn>
            <collect-btn :picture="picture"></collect-btn>
            <share-btn></share-btn>
            <more-btn></more-btn>
          </v-card-text>
          <v-divider class="hidden-sm-and-up"></v-divider>
        </v-card>
      </div>
      <div
        :style="{ width: $vuetify.breakpoint.xsOnly ? `100%` : infoWidth }"
        :class="{
          'pl-4': !$vuetify.breakpoint.xsOnly
        }"
      >
        <v-card
          :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
          :tile="$vuetify.breakpoint.xsOnly"
        >
          <v-card-title>
            {{ picture.name }}
          </v-card-title>
          <v-card-subtitle>
            <p class="ma-0">创建于：{{ picture.createDate }}</p>
            <p class="ma-0">
              <span>
                <router-link to="/">{{ picture.viewAmount }}</router-link>
                人阅读
              </span>
              <span class="ml-4">
                <router-link to="/">{{ picture.likeAmount }}</router-link>
                人喜欢
              </span>
            </p>
          </v-card-subtitle>
          <v-card-text>
            {{ picture.introduction }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-chip
              class="mr-2 my-1"
              small
              v-for="item in picture.tagList"
              :key="item"
              :to="`/search/${encodeURI(item)}`"
            >
              {{ item }}
            </v-chip>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="d-flex align-center">
            <div>
              <v-img
                :src="$img.head(picture.user.avatarUrl)"
                width="45"
                :aspect-ratio="1"
                class="circle"
              ></v-img>
            </div>
            <div class="ellipsis flex-grow-1 mx-3">
              {{ picture.user.nickname }}
            </div>
            <v-btn color="primary" depressed>
              {{
                picture.user.focus === $enum.FollowState.CONCERNED.key
                  ? `已关注`
                  : `关注`
              }}</v-btn
            >
          </v-card-text>
        </v-card>
      </div>
      <corner-buttons>
        <v-btn fab color="white" small v-show="$vuetify.breakpoint.xsOnly">
          <v-icon
            color="error"
            v-if="picture.focus === $enum.CollectState.CONCERNED.key"
            >mdi-star</v-icon
          >
          <v-icon v-else>mdi-star-outline</v-icon>
        </v-btn>
      </corner-buttons>
    </div>
  </div>
</template>

<script>
import { pictureService } from "../../assets/script/service"
import { throttle } from "../../assets/script/util/heighten"
import { DETAIL_INFO_WIDTH } from "../../assets/script/constant"
import { Pageable } from "../../assets/script/model"

export default {
  components: {
    "corner-buttons": () => import("../../components/page/CornerButtons"),
    "comment-btn": () => import("./components/CommentBtn"),
    "collect-btn": () => import("./components/CollectBtn"),
    "share-btn": () => import("./components/ShareBtn"),
    "more-btn": () => import("./components/MoreBtn")
  },
  data() {
    return {
      id: null,
      picture: null,
      throttle: throttle(this.resize, 16),
      height: 0,
      infoWidth: DETAIL_INFO_WIDTH + "px"
    }
  },
  async beforeRouteEnter(to, from, next) {
    window.app.$store?.commit("menu/MUpdateProgress", true)
    const id = to.params.id
    const result = await pictureService.get(id)
    window.app.$store?.commit("menu/MUpdateProgress", false)
    next((vm) => {
      vm.id = id
      vm.picture = result.data
      vm.init()
    })
  },
  async beforeRouteUpdate(to, from, next) {
    window.app.$store?.commit("menu/MUpdateProgress", true)
    this.get(to.params.keyword)
    this.init()
    window.app.$store?.commit("menu/MUpdateProgress", false)
    next()
  },
  methods: {
    async get(id) {
      this.id = id
      const result = await pictureService.get(id)
      this.picture = result.data
    },
    init() {
      this.saveFootprint()
      this.pagingRecommendById()
    },
    saveFootprint() {
      pictureService.saveFootprint(this.id)
    },
    async pagingRecommendById() {
      console.log(
        await pictureService.pagingRecommendById(
          new Pageable(1, 20, "createDate,desc"),
          this.id
        )
      )
    },
    resize() {}
  }
}
</script>

<style lang="scss" scoped></style>
