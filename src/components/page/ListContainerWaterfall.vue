<template>
  <div
    ref="page"
    class="list-container ma-1"
    v-resize="throttle"
    v-scroll="onScroll"
  >
    <div class="list-content" :style="{ width, height }">
      <div
        class="list-item"
        :class="{ transition }"
        v-for="(item, index) in list"
        :style="itemStyleList[index]"
        :key="index"
      >
        <v-card flat class="overflow-hidden" :to="`/picture/${item.id}`">
          <v-card-text class="pa-0">
            <v-img :src="$imageUrl.picture(item.url, `specifiedWidth`)">
              <template v-slot:placeholder>
                <v-skeleton-loader
                  type="image"
                  :height="(cardWidth * item.height) / item.width"
                ></v-skeleton-loader>
              </template>
            </v-img>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div class="mt-12" v-if="!list.length && !loading">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
import { LIST_GAP, LIST_ITEM_WIDTH } from "@/assets/script/constant"
import heightenUtil from "@/plugins/zg/script/util/heighten"
import aliveMixin from "@/plugins/zg/script/mixin/alive"
import { mapState } from "vuex"

export default {
  mixins: [aliveMixin],
  name: "ListContainer",
  props: {
    pageable: {
      type: Object,
      default: () => {}
    },
    page: {
      type: Object,
      default: () => {}
    },
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
      width: 0,
      height: 0,
      cardWidth: 0,
      transition: false,
      itemStyleList: [],
      throttle: heightenUtil.throttle(this.resize, 16)
    }
  },
  watch: {
    list() {
      this.resize()
    },
    height(newValue, oldValue) {
      if (newValue && !oldValue) {
        setTimeout(() => (this.transition = true), 0)
      }
    }
  },
  computed: {
    ...mapState("menu", ["collapse"])
  },
  methods: {
    resize() {
      if (!this.alive) return
      let elWidth = this.$refs.page.clientWidth
      let elHeight = this.$refs.page.clientHeight
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
      let heightList =
        this.list.map((item) => {
          let aspectRatio = 0.5
          if (item.height && item.width) {
            aspectRatio = item.height / item.width
          }
          return aspectRatio * (defaultWidth - defaultGap)
        }) || []
      let styleList = []
      const columnHeightList = new Array(colAmount).fill(0)
      for (let i = 0; i < heightList.length; i++) {
        const minColumnHeight = Math.min.apply(null, columnHeightList)
        const minColumnIndex = columnHeightList.indexOf(minColumnHeight)
        const left = defaultWidth * minColumnIndex
        const top = minColumnHeight
        columnHeightList[minColumnIndex] = heightList[i] + top + defaultGap
        styleList.push({
          padding: `${defaultGap / 2}px`,
          transform: `translate(${left}px, ${top}px)`,
          width: defaultWidth + "px"
        })
      }
      this.itemStyleList = styleList
      this.width = colAmount * defaultWidth + `px`
      this.height = Math.max.apply(null, columnHeightList) + `px`
      this.cardWidth = defaultWidth - defaultGap
      if (
        elHeight &&
        window.innerHeight >= elHeight &&
        this.page &&
        this.page.meta.currentPage !== this.page.meta.totalPages
      ) {
        this.$emit("change", this.page?.currentPage + 2)
      }
    },
    // eslint-disable-next-line no-unused-vars
    onScroll({ target }) {
      if (!this.alive) return
      const { documentElement } = target
      const scrollTop = documentElement.scrollTop
      const scrollBottom =
        documentElement.scrollHeight - scrollTop - documentElement.clientHeight
      if (scrollBottom < 300 && this.page) {
        this.$emit("change", this.page?.currentPage + 2)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  .list-content {
    margin: auto;
    position: relative;
    .list-item {
      &.transition {
        transition-property: opacity, transform;
        transition-duration: 0.2s;
        opacity: 1;
      }
      opacity: 0;
      position: absolute;
    }
  }
}
</style>
