<template>
  <div ref="page" class="list-container" v-resize="throttle">
    <div class="list-content" :style="{ width, height }">
      <div
        class="list-item"
        :class="{ transition }"
        v-for="(item, index) in list"
        :style="itemStyleList[index]"
        :key="index"
      >
        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 5 : 1">
              <v-card-text class="pa-0">
                <v-img :src="$img.secdra(item.url, `specifiedWidth`)"></v-img>
              </v-card-text>
              <!--              <v-card-text class="py-0">-->
              <!--                <v-chip class="ma-1" x-small close>-->
              <!--                  标签-->
              <!--                </v-chip>-->
              <!--              </v-card-text>-->
              <!--              <v-card-actions class="pt-0" style="height: 40px;">-->
              <!--                <v-tooltip bottom>-->
              <!--                  <template v-slot:activator="{ on }">-->
              <!--                    <v-btn style="margin:0 3px" fab text x-small v-on="on">-->
              <!--                      <v-icon dark>mdi-pin-outline</v-icon>-->
              <!--                    </v-btn>-->
              <!--                  </template>-->
              <!--                  <span>置顶</span>-->
              <!--                </v-tooltip>-->
              <!--                <v-tooltip bottom>-->
              <!--                  <template v-slot:activator="{ on }">-->
              <!--                    <v-btn style="margin:0 3px" fab text x-small v-on="on">-->
              <!--                      <v-icon dark>mdi-bell-outline</v-icon>-->
              <!--                    </v-btn>-->
              <!--                  </template>-->
              <!--                  <span>提醒我</span>-->
              <!--                </v-tooltip>-->
              <!--                <v-tooltip bottom>-->
              <!--                  <template v-slot:activator="{ on }">-->
              <!--                    <v-btn style="margin:0 3px" fab text x-small v-on="on">-->
              <!--                      <v-icon dark>mdi-palette-outline</v-icon>-->
              <!--                    </v-btn>-->
              <!--                  </template>-->
              <!--                  <span>更改颜色</span>-->
              <!--                </v-tooltip>-->
              <!--                <v-tooltip bottom>-->
              <!--                  <template v-slot:activator="{ on }">-->
              <!--                    <v-btn style="margin:0 3px" fab text x-small v-on="on">-->
              <!--                      <v-icon dark>mdi-image-outline</v-icon>-->
              <!--                    </v-btn>-->
              <!--                  </template>-->
              <!--                  <span>添加图片</span>-->
              <!--                </v-tooltip>-->
              <!--                <v-tooltip bottom>-->
              <!--                  <template v-slot:activator="{ on }">-->
              <!--                    <v-btn-->
              <!--                      style="margin:0 3px"-->
              <!--                      fab-->
              <!--                      text-->
              <!--                      x-small-->
              <!--                      v-on="on"-->
              <!--                      @click="show(list)"-->
              <!--                    >-->
              <!--                      <v-icon dark>mdi-archive-arrow-down-outline</v-icon>-->
              <!--                    </v-btn>-->
              <!--                  </template>-->
              <!--                  <span>归档</span>-->
              <!--                </v-tooltip>-->
              <!--                <v-menu offset-y>-->
              <!--                  <template v-slot:activator="{ on: onMenu }">-->
              <!--                    <v-tooltip bottom>-->
              <!--                      <template v-slot:activator="{ on: onTooltip }">-->
              <!--                        <v-btn-->
              <!--                          style="margin:0 3px"-->
              <!--                          fab-->
              <!--                          text-->
              <!--                          x-small-->
              <!--                          v-on="Object.assign(onTooltip, onMenu)"-->
              <!--                        >-->
              <!--                          <v-icon dark>mdi-dots-vertical</v-icon>-->
              <!--                        </v-btn>-->
              <!--                      </template>-->
              <!--                      <span>更多</span>-->
              <!--                    </v-tooltip>-->
              <!--                  </template>-->
              <!--                  <v-list dense>-->
              <!--                    <v-list-item>-->
              <!--                      <v-list-item-content>-->
              <!--                        123-->
              <!--                      </v-list-item-content>-->
              <!--                    </v-list-item>-->
              <!--                  </v-list>-->
              <!--                </v-menu>-->
              <!--              </v-card-actions>-->
            </v-card>
          </template>
        </v-hover>
      </div>
    </div>
    <div class="empty-container" v-if="!list.length">
      <h2 class="title text-center">你的记事将会显示在此处</h2>
    </div>
  </div>
</template>

<script>
import { listConstant } from "../../assets/script/constant"
import { throttle } from "../../assets/script/util/heighten"

export default {
  name: "ListContainer",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      listConstant: listConstant(),
      width: 0,
      height: 0,
      transition: false,
      itemStyleList: [],
      throttle: throttle(this.resize, 200)
    }
  },
  watch: {
    height(newValue, oldValue) {
      if (newValue && !oldValue) {
        setTimeout(() => (this.transition = true), 0)
      }
    }
  },
  computed: {
    collapse: {
      get() {
        return this.$store.state.menu.collapse
      }
    }
  },
  methods: {
    resize() {
      let elWidth = this.$refs.page.clientWidth
      let sourceColAmount = Math.floor(elWidth / this.listConstant.width)
      let defaultWidth = this.listConstant.width
      let defaultGap = this.listConstant.gap
      let colAmount = 2
      if (sourceColAmount <= 1) {
        colAmount = 2
        defaultWidth = elWidth / 2
        defaultGap = 8
      } else if (sourceColAmount > 4) {
        colAmount = this.collapse ? sourceColAmount : sourceColAmount - 1
      } else {
        colAmount = sourceColAmount
      }
      let heightList =
        this.list.map(
          (item) => (item.height / item.width) * (defaultWidth - defaultGap)
        ) || []
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
    },
    show(x) {
      console.log(x)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  margin: 0 -8px;
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

.empty-container {
  margin-top: 20vh;
}
</style>
