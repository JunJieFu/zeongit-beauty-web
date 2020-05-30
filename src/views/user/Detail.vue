<template>
  <div>
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
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import { tagService } from "../../assets/script/service"
import alivePageMixin from "../../assets/script/mixin/alivePage"
export default {
  mixins: [alivePageMixin],
  async created() {
    this.init()
  },
  data() {
    return {
      targetId: null,
      tagFrequency: []
    }
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    ...mapMutations("alive", ["MAddUserMap"]),
    async init() {
      window.scrollTo(0, 0)
      this.MUpdateProgress(true)
      //这里不读store里缓存的，直接获取
      await this.listTagFrequencyByUserId(this.$route.params.targetId)
      this.MUpdateProgress(false)
    },
    async listTagFrequencyByUserId(id) {
      this.id = id
      const result = await tagService.listTagFrequencyByUserId(id)
      this.tagFrequency = result.data
    }
  }
}
</script>

<style scoped></style>
