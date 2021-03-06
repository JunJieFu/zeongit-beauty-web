<template>
  <div ref="page" class="list-container ma-1" v-resize="throttle">
    <div class="list-content" :style="style" v-if="list.length">
      <div
        class="list-item transition"
        v-for="(item, index) in list"
        :key="index"
      >
        <v-card
          flat
          class="d-flex align-center fill-height overflow-hidden"
          :to="`/picture/${item.id}`"
        >
          <v-card-text class="pa-0">
            <v-img
              :src="
                $imageUrl.picture(
                  item.url,
                  item.aspectRatio ? `specifiedWidth` : `specifiedHeight`
                )
              "
              :aspect-ratio="1"
            >
              <template v-slot:placeholder>
                <v-skeleton-loader
                  type="image"
                  height="100%"
                  width="100%"
                ></v-skeleton-loader>
              </template>
            </v-img>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div v-else-if="!loading">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import heightenUtil from "@/plugins/zg/script/util/heighten"
import { LIST_GAP, LIST_ITEM_WIDTH } from "@/assets/script/constant"

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      style: null,
      throttle: heightenUtil.throttle(this.resize, 16)
    }
  },
  methods: {
    resize() {
      if (!this.$refs.page) return
      let elWidth = this.$refs.page.clientWidth
      let sourceColAmount = Math.floor(elWidth / LIST_ITEM_WIDTH)
      let defaultWidth = LIST_ITEM_WIDTH
      let defaultGap = LIST_GAP
      let colAmount = 2
      if (sourceColAmount <= 1) {
        colAmount = 2
        defaultWidth = elWidth / 2
        defaultGap = 8
      } else {
        colAmount = sourceColAmount
      }
      this.style = {
        gridTemplateColumns: `repeat(${colAmount},${defaultWidth -
          defaultGap}px)`,
        gridGap: defaultGap + "px",
        padding: defaultGap / 2 + "px" + " " + 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  .list-content {
    display: grid;
    justify-content: center;

    .item-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
