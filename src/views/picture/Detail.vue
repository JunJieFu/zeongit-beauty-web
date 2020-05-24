<template>
  <div
    class="mx-auto d-flex"
    v-resize="throttle"
    ref="page"
    style="max-width: 1120px"
    :class="{ 'pa-4': !$vuetify.breakpoint.xsOnly }"
  >
    <div :style="style">
      <v-card
        :elevation="$vuetify.breakpoint.xsOnly ? 0 : 5"
        :tile="$vuetify.breakpoint.xsOnly"
      >
        <v-img
          :src="
            $img.secdra(picture ? picture.url : undefined, `specifiedWidth1200`)
          "
          :contain="!$vuetify.breakpoint.xsOnly"
          :aspect-ratio="
            $vuetify.breakpoint.xsOnly ? picture.width / picture.height : 1
          "
        />
      </v-card>
    </div>
    <div style="width: 256px" class="pl-4 hidden-xs-only">
      <v-card>
        <router-link :to="`/works/${picture.user.id}`">GO </router-link>
        <br />
        <v-chip
          class="mr-2 my-1"
          small
          v-for="item in picture.tagList"
          :key="item"
          :to="`/search/${encodeURI(item)}`"
        >
          {{ item }}
        </v-chip>
      </v-card>
    </div>
  </div>
</template>

<script>
import { pictureService } from "../../assets/script/service"
import { throttle } from "../../assets/script/util/heighten"
import { DETAIL_GAP, DETAIL_INFO_WIDTH } from "../../assets/script/constant"

export default {
  data() {
    return {
      id: null,
      picture: null,
      throttle: throttle(this.resize, 16),
      height: 0
    }
  },
  async beforeRouteEnter(to, from, next) {
    window.app.$store?.commit("menu/MUpdateProgress", true)
    const id = to.params.id
    const result = await pictureService.get(id)
    window.app.$store?.commit("menu/MUpdateProgress", false)
    next((vm) => {
      vm.id = id
      vm.picture = result.data
    })
  },
  computed: {
    style() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return {
          width: `100%`
        }
      } else {
        return {
          width: `calc(100% - ${DETAIL_INFO_WIDTH}px - ${DETAIL_GAP}px)`
        }
      }
    }
  },
  methods: {
    resize() {}
  }
}
</script>

<style lang="scss" scoped></style>
