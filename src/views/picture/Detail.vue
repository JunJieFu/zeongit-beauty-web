<template>
  <div
    class="mx-auto"
    v-resize="throttle"
    ref="page"
    style="display: grid;max-width: 1120px"
    :style="style"
  >
    <v-card :style="{ height }" :elevation="0">
      <div style="height: 100%;width: 100%">
        <v-img
          :src="
            $img.secdra(picture ? picture.url : undefined, `specifiedWidth1200`)
          "
          contain
        >
        </v-img>
      </div>
    </v-card>
    <v-card>
      1
    </v-card>
    <v-card>
      1
    </v-card>
  </div>
</template>

<script>
import { pictureService } from "../../assets/script/service"
import { throttle } from "../../assets/script/util/heighten"
import { detailConstant } from "../../assets/script/constant"

export default {
  data() {
    return {
      detailConstant: detailConstant(),
      id: null,
      picture: null,
      throttle: throttle(this.resize, 200),
      style: {},
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
  methods: {
    resize() {
      let elWidth = this.$refs.page.clientWidth
      const infoWidth = this.detailConstant.infoWidth
      const gap = this.detailConstant.gap
      if (elWidth < this.detailConstant.minWidth) {
        this.style = {
          gridTemplateColumns: `100%`,
          gridGap: gap + "px"
        }
        this.height = elWidth + "px"
      } else {
        this.style = {
          gridTemplateColumns: `${elWidth - infoWidth - gap}px ${infoWidth}px`,
          gridGap: gap + "px"
        }
        this.height = elWidth - infoWidth - gap + "px"
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
