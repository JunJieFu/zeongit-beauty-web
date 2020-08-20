<template>
  <div
    class="page mx-auto"
    :class="{
      'pa-4': !$vuetify.breakpoint.xsOnly
    }"
  >
    <v-card
      :outlined="$vuetify.breakpoint.xsOnly ? undefined : true"
      :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
      :tile="$vuetify.breakpoint.xsOnly"
      v-if="user"
    >
      <v-img
        :aspect-ratio="$vuetify.breakpoint.xsOnly ? 2 : 3"
        :src="$imageUrl.background(user.background)"
      ></v-img>
      <v-row class="ma-0 ">
        <v-col
          :cols="12"
          :sm="6"
          :md="4"
          :lg="4"
          class="pa-0 text-center"
          style="margin-top: -40px"
        >
          <avatar
            :info="user"
            :size="$vuetify.breakpoint.xsOnly ? 100 : 130"
            class="elevation-5"
          ></avatar>
        </v-col>
        <v-col
          :cols="12"
          :sm="6"
          :md="8"
          :lg="8"
          class="pa-0 justify-center d-flex flex-column"
          :class="{
            'pl-5': $vuetify.breakpoint.smAndUp,
            'text-center': $vuetify.breakpoint.xsOnly
          }"
        >
          <v-card-title
            :class="{ 'justify-center': $vuetify.breakpoint.xsOnly }"
          >
            {{ user.nickname }}
          </v-card-title>
          <v-card-text>
            {{ user.introduction }}
          </v-card-text>
        </v-col>
      </v-row>
      <v-card-title class="d-flex justify-end">
        <follow-icon-btn
          :user="user"
          v-if="!self"
          @follow="follow"
        ></follow-icon-btn>
        <share-btn></share-btn>
        <more-btn v-if="!self"></more-btn>
      </v-card-title>
      <v-tabs class="mt-4" v-model="type">
        <v-tab :to="`/user${targetId ? '/' + targetId : ''}`">主页</v-tab>
        <v-tab :to="`/follower${targetId ? '/' + targetId : ''}`">粉丝</v-tab>
        <v-tab :to="`/following${targetId ? '/' + targetId : ''}`">关注</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <keep-alive :max="15">
        <router-view :key="decodeURI($route.fullPath)" />
      </keep-alive>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import { userService } from "@/assets/script/service"

export default {
  props: {
    targetId: {
      type: [String, null, undefined],
      default: undefined
    }
  },
  components: {
    "follow-icon-btn": () => import("@/components/btn/FollowIconBtn"),
    "share-btn": () => import("./components/ShareBtn"),
    "more-btn": () => import("./components/MoreBtn")
  },
  async created() {
    this.init()
  },
  data() {
    return {
      type: "",
      user: null
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    ...mapState("alive", ["userMap"]),
    self() {
      const targetId = parseInt(this.targetId)
      return !targetId || this.info?.id === targetId
    }
  },
  watch: {
    targetId() {
      this.init()
    }
  },
  methods: {
    ...mapMutations("alive", ["MAddUserMap"]),
    async init() {
      window.scrollTo(0, 0)
      this.user = this.userMap[this.targetId]
      if (!this.user) await this.get(this.targetId)
    },
    async get(id) {
      const result = await userService.getByTargetId(id)
      this.user = result.data
      this.MAddUserMap(this.user)
    },
    follow({ focus }) {
      this.user.focus = focus
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
