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
      <v-img :aspect-ratio="4" :src="$img.back(user.background)"></v-img>
      <v-row class="ma-0">
        <v-col :cols="6" :sm="6" :md="4" :lg="4" class="pa-0">
          <v-img
            :src="$img.head(user.avatarUrl)"
            class="circle elevation-5"
            :width="$vuetify.breakpoint.xsOnly ? 80 : 100"
            :aspect-ratio="1"
          />
        </v-col>
        <v-col
          :cols="6"
          :sm="6"
          :md="8"
          :lg="8"
          class="pa-0  justify-center d-flex flex-column"
          :class="{ 'pl-5': $vuetify.breakpoint.smAndUp }"
        >
          <v-card-title>
            {{ user.nickname }}
          </v-card-title>
          <v-card-text>
            {{ user.introduction }}
          </v-card-text>
        </v-col>
      </v-row>
      <v-card-title>
        <v-chip
          class="mr-2 my-1"
          small
          v-for="item in tagFrequencyList"
          :key="item.name"
          :to="`/search/${encodeURI(item.name)}`"
        >
          {{ item.name }}({{ item.amount }})
        </v-chip>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex"
import aliveMixin from "../../assets/script/mixin/alive"
import { tagService, userService } from "../../assets/script/service"
export default {
  mixins: [aliveMixin],
  created() {
    window.scrollTo(0, 0)
    window.app.$store?.commit("menu/MUpdateProgress", true)
    this.get(this.$route.params.id)
    this.listTagFrequencyByUserId(this.$route.params.id)
    window.app.$store?.commit("menu/MUpdateProgress", false)
  },
  data() {
    return { user: null, tagFrequencyList: [] }
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    async get(id) {
      this.id = id
      const result = await userService.getByTargetId(id)
      this.user = result.data
    },
    async listTagFrequencyByUserId(id) {
      const result = await tagService.listTagFrequencyByUserId(id)
      this.tagFrequencyList = result.data
    }
  }
}
</script>

<style lang="scss" scoped>
$page-size: 1120px;
.page {
  max-width: $page-size;
}
</style>
