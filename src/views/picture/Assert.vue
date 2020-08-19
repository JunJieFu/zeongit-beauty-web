<template>
  <div v-if="loading"></div>
  <div v-else>
    <v-row
      class="ma-0"
      justify="center"
      align="center"
      v-if="status !== constant.SUCCESS"
    >
      <v-col cols="12" sm="7" md="5" lg="4" xl="3">
        <tips-page-card
          icon="mdi-image-outline"
          title="获取图片有误"
          :text="message"
        ></tips-page-card>
      </v-col>
    </v-row>
    <router-view v-else :picture="picture" />
  </div>
</template>

<script>
import { pictureService } from "@/assets/script/service"
import { mapMutations, mapState } from "vuex"
import alivePageMixin from "@/plugins/zg/script/mixin/alivePage"
import constant from "@/plugins/zg/script/constant/main"
export default {
  mixins: [alivePageMixin],
  components: {
    "tips-page-card": () => import("@/components/page/TipsPageCard")
  },
  props: {
    id: {
      type: [String, null, undefined],
      default: undefined
    }
  },
  data() {
    return {
      constant,
      loading: true,
      picture: null,
      message: "",
      status: 0
    }
  },
  computed: {
    ...mapState("user", ["info"])
  },
  async created() {
    this.init()
  },
  methods: {
    ...mapMutations("alive", ["MAddPictureMap"]),
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      //这里不读store里缓存的，直接获取
      await this.get(this.id)
      this.MUpdateProgress(false)
      this.loading = false
    },
    async get(id) {
      const result = await pictureService.get(id)
      this.picture = result.data
      this.status = result.status
      this.message = result.message
      if (this.status === constant.SUCCESS) {
        this.MAddPictureMap(this.picture)
      }
    }
  }
}
</script>

<style scoped></style>
