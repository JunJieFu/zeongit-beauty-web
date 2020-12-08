<template>
  <div ref="page" class="list-container ma-1" v-resize="throttle">
    <template v-if="page && page.items.length">
      <div class="list-content" :style="style">
        <div
          class="list-item transition"
          v-for="(item, index) in page.items"
          :key="index"
        >
          <v-card
            flat
            outlined
            class="d-flex align-center fill-height overflow-hidden"
            :to="`/picture/${item.id}`"
          >
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
      <v-pagination
        :value="pageable.page"
        :length="page.meta.totalPages"
        :total-visible="7"
        @input="change"
        class="mt-4"
      ></v-pagination>
    </template>
    <div class="mt-12" v-else-if="!loading">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import heightenUtil from "@/plugins/zg/script/util/heighten"
import { LIST_GAP, LIST_ITEM_WIDTH } from "@/assets/script/constant"
import { mapState } from "vuex"

export default {
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
  watch: {
    page() {
      window.scrollTo(0, 0)
    }
  },
  data() {
    return {
      style: null,
      cardWidth: 0,
      throttle: heightenUtil.throttle(this.resize, 16)
    }
  },
  computed: {
    ...mapState("menu", ["collapse"])
  },
  methods: {
    resize() {
      let elWidth = this.$refs.page.clientWidth
      let sourceColAmount = Math.floor(elWidth / LIST_ITEM_WIDTH)
      let defaultWidth = LIST_ITEM_WIDTH
      let defaultGap = LIST_GAP
      let colAmount = 2
      if (sourceColAmount <= 1) {
        colAmount = 2
        defaultWidth = elWidth / 2
        defaultGap = 8
      }
      // else if (sourceColAmount > 4) {
      //   colAmount = this.collapse ? sourceColAmount : sourceColAmount - 1
      // }
      else {
        colAmount = sourceColAmount
      }
      this.cardWidth = defaultWidth - defaultGap
      this.style = {
        gridTemplateColumns: `repeat(${colAmount},${defaultWidth -
          defaultGap}px)`,
        gridGap: defaultGap + "px",
        padding: defaultGap / 2 + "px" + " " + 0
      }
    },
    change(e) {
      this.$emit("change", e)
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
