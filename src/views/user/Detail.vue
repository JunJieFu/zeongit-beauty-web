<template>
  <div>
    <template v-if="tagFrequency.length">
      <v-card-title>
        标签
      </v-card-title>
      <v-card-text>
        <v-chip
          class="mr-2 my-1"
          small
          v-for="(item, index) in tagFrequency"
          :key="index"
          :to="`/search/${encodeURIComponent(item.name)}`"
        >
          {{ item.name }} ({{ item.amount }})
        </v-chip>
      </v-card-text>
      <v-divider></v-divider>
    </template>
    <v-card-title>
      作品
    </v-card-title>
    <v-card-text class="pa-0">
      <list-container :list="worksList" :loading="worksLoading">
        <v-row class="ma-0" justify="center" align="center">
          <v-col cols="12" sm="7" md="5" lg="4" xl="3" class="pa-0">
            <tips-page-card
              :icon="$constant.EMPTY_TIP_ICON.works"
              :title="$vuetify.lang.t('$vuetify.emptyTip.title.works')"
            ></tips-page-card>
          </v-col>
        </v-row>
      </list-container>
    </v-card-text>
    <v-card-actions v-if="worksList.length" class="justify-center">
      <v-btn
        color="primary"
        depressed
        outlined
        rounded
        class="px-6"
        :to="`/works/${realTargetId}`"
        >查看更多</v-btn
      >
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-title>
      收藏
    </v-card-title>
    <v-card-text class="pa-0">
      <list-container :list="collectionList" :loading="collectionLoading">
        <v-row class="ma-0" justify="center" align="center">
          <v-col cols="12" sm="7" md="5" lg="4" xl="3" class="pa-0">
            <tips-page-card
              :icon="$constant.EMPTY_TIP_ICON.collection"
              :title="$vuetify.lang.t('$vuetify.emptyTip.title.collection')"
            ></tips-page-card>
          </v-col>
        </v-row>
      </list-container>
    </v-card-text>
    <v-card-actions v-if="collectionList.length" class="justify-center">
      <v-btn
        color="primary"
        depressed
        outlined
        rounded
        class="px-6"
        :to="`/collection/${realTargetId}`"
        >查看更多</v-btn
      >
    </v-card-actions>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import {
  collectionService,
  worksService,
  tagService
} from "@/assets/script/service"
import alivePageMixin from "@/plugins/zg/script/mixin/alivePage"
import { Pageable } from "@/plugins/zg/script/model/main"
export default {
  mixins: [alivePageMixin],
  components: {
    "tips-page-card": () => import("@/components/page/TipsPageCard"),
    "list-container": () => import("@/components/page/ListContainer")
  },
  async created() {
    this.init()
  },
  props: {
    targetId: {
      type: [String, null, undefined],
      default: undefined
    }
  },
  data() {
    return {
      tagFrequency: [],
      pageable: new Pageable(0, 8),
      worksList: [],
      worksLoading: false,
      collectionList: [],
      collectionLoading: false
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    realTargetId() {
      return this.targetId || this.info?.id
    }
  },
  methods: {
    ...mapMutations("alive", ["MAddUserMap"]),
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      //这里不读store里缓存的，直接获取
      await this.listTagFrequencyByUserId(this.realTargetId)
      this.pagingWorks(this.realTargetId)
      this.pagingCollection(this.realTargetId)
      this.MUpdateProgress(false)
    },
    async listTagFrequencyByUserId(id) {
      const result = await tagService.listTagFrequencyByUserId(id)
      this.tagFrequency = result.data
    },
    async pagingWorks(id) {
      this.worksLoading = true
      const result = await worksService.paging(this.pageable, id)
      this.worksLoading = false
      this.worksList = result?.data?.content || []
    },
    async pagingCollection(id) {
      this.collectionLoading = true
      const result = await collectionService.paging(this.pageable, id)
      this.collectionLoading = false
      this.collectionList = result?.data?.content || []
    }
  }
}
</script>

<style scoped></style>
