<template>
  <div>
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
        <v-speed-dial
          v-model="settingsVisible"
          direction="left"
          transition="scale-transition"
          v-if="picture && picture.user.id === info.id"
        >
          <template v-slot:activator>
            <v-tooltip top :disabled="$isMobile">
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  v-model="settingsVisible"
                  fab
                  :small="$vuetify.breakpoint.xsOnly"
                >
                  <v-fab-transition>
                    <v-icon style="position: absolute" v-show="settingsVisible"
                      >mdi-close</v-icon
                    >
                  </v-fab-transition>
                  <v-fab-transition>
                    <v-icon style="position: absolute" v-show="!settingsVisible"
                      >mdi-cog-outline</v-icon
                    >
                  </v-fab-transition>
                </v-btn>
              </template>
              <span>设置</span>
            </v-tooltip>
          </template>
          <remove-btn></remove-btn>
          <privacy-btn :picture="picture" @privacy="privacy"></privacy-btn>
          <edit-btn></edit-btn>
        </v-speed-dial>
      </corner-buttons>
    </div>
  </div>
</template>

<script>
import { footprintService, pictureService } from "../../assets/script/service"
import { DETAIL_INFO_WIDTH } from "../../assets/script/constant"
import { mapMutations, mapState } from "vuex"
import alivePageMixin from "../../assets/script/mixin/alivePage"

export default {
  mixins: [alivePageMixin],
  async created() {
    this.init()
  },
  components: {
    "corner-buttons": () => import("../../components/page/CornerButtons"),
    "user-item": () => import("./components/UserItem"),
    "comment-btn": () => import("./components/CommentBtn"),
    "collect-btn": () => import("../../components/btn/CollectBtn"),
    "share-btn": () => import("./components/ShareBtn"),
    "more-btn": () => import("./components/MoreBtn"),
    "remove-btn": () => import("./components/RemoveBtn"),
    "privacy-btn": () => import("./components/PrivacyBtn"),
    "edit-btn": () => import("./components/EditBtn")
  },
  data() {
    return {
      id: null,
      picture: null,
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
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      //这里不读store里缓存的，直接获取
      await this.get(this.$route.params.id)
      this.MUpdateProgress(false)
    },
    async get(id) {
      this.id = id
      const result = await pictureService.get(id)
      this.picture = result.data
      this.MAddPictureMap(this.picture)
      this.saveFootprint()
      this.pagingRecommendById()
    },
    saveFootprint() {
      footprintService.save(this.id)
    },
    async pagingRecommendById() {
      // console.log(
      //   await pictureService.pagingRecommendById(
      //     new Pageable(1, 20, "createDate,desc"),
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
@import "src/assets/style/config";
.page {
  max-width: $page-size;
}
</style>
