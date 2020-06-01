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
        :src="$img.back(user.background)"
      ></v-img>
      <v-row class="ma-0 ">
        <v-col
          :cols="12"
          :sm="6"
          :md="4"
          :lg="4"
          class="pa-0 "
          style="margin-top: -40px"
        >
          <v-img
            :src="$img.head(user.avatarUrl)"
            class="circle elevation-5 mx-auto"
            :width="$vuetify.breakpoint.xsOnly ? 100 : 130"
            :aspect-ratio="1"
          />
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
        <follow-icon-btn :user="user" v-if="!self"></follow-icon-btn>
        <share-btn></share-btn>
        <more-btn v-if="!self"></more-btn>
      </v-card-title>
      <v-tabs class="mt-4" v-model="type">
        <v-tab
          :to="
            `/user${$route.params.targetId ? '/' + $route.params.targetId : ''}`
          "
          >主页</v-tab
        >
        <v-tab
          :to="
            `/follower${
              $route.params.targetId ? '/' + $route.params.targetId : ''
            }`
          "
          >粉丝</v-tab
        >
        <v-tab
          :to="
            `/following${
              $route.params.targetId ? '/' + $route.params.targetId : ''
            }`
          "
          >关注</v-tab
        >
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
import { userService } from "../../assets/script/service"

export default {
  components: {
    "follow-icon-btn": () => import("../../components/btn/FollowIconBtn"),
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
      return (
        !this.$route.params.targetId ||
        this.info?.id === parseInt(this.$route.params.targetId)
      )
    }
  },
  watch: {
    "$route.params.targetId"() {
      this.init()
    }
  },
  methods: {
    ...mapMutations("alive", ["MAddUserMap"]),
    async init() {
      window.scrollTo(0, 0)
      this.user = this.userMap[this.$route.params.targetId]
      if (!this.user) await this.get(this.$route.params.targetId)
    },
    async get(id) {
      const result = await userService.getByTargetId(id)
      this.user = result.data
      this.MAddUserMap(this.user)
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
