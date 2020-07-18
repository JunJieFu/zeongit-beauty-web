<template>
  <div
    class="page justify-center d-flex flex-column mx-auto"
    :class="{
      'pa-4': !$vuetify.breakpoint.xsOnly
    }"
  >
    <v-card
      :outlined="$vuetify.breakpoint.xsOnly ? undefined : true"
      :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
      v-if="picture"
    >
      <v-row class="ma-0">
        <v-col :cols="6" :sm="6" :md="4" :lg="4" class="pa-0">
          <router-link :to="`/picture/${id}`" class="d-block">
            <v-img
              :src="$imageUrl.picture(picture.url, `specifiedWidth`)"
              :contain="!$vuetify.breakpoint.xsOnly"
              :aspect-ratio="
                $vuetify.breakpoint.xsOnly ? picture.width / picture.height : 1
              "
              v-ripple
            ></v-img>
          </router-link>
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
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <keep-alive :max="15">
        <router-view :key="decodeURI($route.fullPath)" />
      </keep-alive>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import { pictureService } from "../../assets/script/service"

export default {
  async created() {
    this.init()
  },
  data() {
    return {
      id: this.$route.params.id,
      picture: null
    }
  },
  computed: {
    ...mapState("alive", ["pictureMap"])
  },
  watch: {
    "$route.params.id"() {
      this.init()
    }
  },
  methods: {
    ...mapMutations("alive", ["MAddPictureMap"]),
    async init() {
      window.scrollTo(0, 0)
      this.picture = this.pictureMap[this.$route.params.id]
      if (!this.picture) await this.get(this.$route.params.id)
    },
    async get(id) {
      this.id = id
      const result = await pictureService.get(id)
      this.picture = result.data
      this.MAddPictureMap(this.picture)
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
