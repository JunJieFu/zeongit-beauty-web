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
              :src="$img.secdra(picture.url, `specifiedWidth`)"
              :contain="!$vuetify.breakpoint.xsOnly"
              :aspect-ratio="
                $vuetify.breakpoint.xsOnly ? picture.width / picture.height : 1
              "
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
      <router-view></router-view>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { pictureService } from "../../assets/script/service"
import aliveMixin from "../../assets/script/mixin/alive"

export default {
  mixins: [aliveMixin],
  data() {
    return {
      id: this.$route.params.id,
      picture: null,
      viewerPage: null
    }
  },
  computed: {
    ...mapState("keepAlive", { pageAlive: "page" })
  },
  async created() {
    window.scrollTo(0, 0)
    const keepAliveKeys = Object.keys(this.pageAlive)
    const regs = [
      new RegExp(`^\\/picture\\/${this.$route.params.id}(?:\\/(?=$))?$`, "i"),
      new RegExp(
        `^\\/picture\\/${this.$route.params.id}\\/footprint(?:\\/(?=$))?$`,
        "i"
      ),
      new RegExp(
        `^\\/picture\\/${this.$route.params.id}\\/collection(?:\\/(?=$))?$`,
        "i"
      )
    ]
    const key = keepAliveKeys.find((it) => {
      return !!regs.filter((reg) => reg.test(it))
    })
    this.picture = this.pageAlive[key]?.picture
      ? Object.assign({}, this.pageAlive[key]?.picture)
      : null
    if (!this.picture) this.get(this.$route.params.id)
  },
  methods: {
    async get(id) {
      this.id = id
      const result = await pictureService.get(id)
      this.picture = result.data
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
