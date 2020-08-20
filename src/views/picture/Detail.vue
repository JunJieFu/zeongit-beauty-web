<template>
  <div
    class="page mx-auto d-flex"
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
            $imageUrl.picture(
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
          <collect-btn :picture="picture" @collect="collect"></collect-btn>
          <share-btn :picture="picture"></share-btn>
          <more-btn :picture="picture"></more-btn>
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
          <p class="ma-0">创建于：{{ picture.createDate | ago }}</p>
          <p class="ma-0">
            <span>
              <router-link :to="`/picture/${picture.id}/footprint`">{{
                picture.viewAmount
              }}</router-link>
              人阅读
            </span>
            <span class="ml-4">
              <router-link :to="`/picture/${picture.id}/collection`">{{
                picture.likeAmount
              }}</router-link>
              人喜欢
            </span>
          </p>
        </v-card-subtitle>
        <v-card-text>
          {{ picture.introduction }}
        </v-card-text>
        <template v-if="picture.tagList.length">
          <v-divider></v-divider>
          <v-card-text>
            <v-chip
              class="mr-2 my-1"
              small
              v-for="item in picture.tagList"
              :key="item"
              :to="`/search/${encodeURIComponent(item)}`"
            >
              {{ item }}
            </v-chip>
          </v-card-text>
        </template>
        <v-divider></v-divider>
        <user-item :user="picture.user" @follow="follow"></user-item>
      </v-card>
    </div>
    <corner-buttons>
      <corner-speed-dial
        :picture="picture"
        @privacy="privacy"
        v-if="picture && info && picture.user.id === info.id"
      ></corner-speed-dial>
    </corner-buttons>
  </div>
</template>

<script>
import { NOOP } from "@/plugins/zg/script/constant/main"
import { DETAIL_INFO_WIDTH } from "@/assets/script/constant"
import { mapMutations, mapState } from "vuex"
import { footprintService } from "@/assets/script/service"

export default {
  components: {
    "corner-buttons": () => import("@/components/page/CornerButtons"),
    "user-item": () => import("./components/UserItem"),
    "comment-btn": () => import("./components/CommentBtn"),
    "collect-btn": () => import("@/components/btn/CollectBtn"),
    "share-btn": () => import("./components/ShareBtn"),
    "more-btn": () => import("./components/MoreBtn"),
    "corner-speed-dial": () => import("./components/CornerSpeedDial")
    // "remove-btn": () => import("./components/RemoveBtn"),
    // "privacy-btn": () => import("./components/PrivacyBtn"),
    // "edit-btn": () => import("./components/EditBtn")
  },
  props: {
    id: {
      type: [String, null, undefined],
      default: undefined
    },
    picture: {
      type: Object,
      default: NOOP
    }
  },
  data() {
    return {
      height: 0,
      infoWidth: DETAIL_INFO_WIDTH + "px",
      settingsVisible: false
    }
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    ...mapMutations("alive", ["MAddPictureMap"]),
    saveFootprint() {
      footprintService.save(this.id)
    },
    async pagingRecommendById() {
      // console.log(
      //   await pictureService.pagingRecommendById(
      //     new Pageable(),
      //     this.id
      //   )
      // )
    },
    collect({ focus }) {
      this.picture.focus = focus
    },
    follow({ focus }) {
      this.picture.user.focus = focus
    },
    privacy({ privacy }) {
      this.picture.privacy = privacy
      this.settingsVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/plugins/zg/style/config";
.page {
  max-width: $page-size;
}
</style>
