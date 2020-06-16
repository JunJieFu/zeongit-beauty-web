<template>
  <div ref="page" class="list-container" v-resize="throttle">
    <template v-if="page && page.content.length">
      <div class="list-content" :style="style">
        <div
          class="list-item transition"
          v-for="(item, index) in page.content"
          :key="index"
        >
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :elevation="hover ? 5 : 1"
                class="d-flex align-center fill-height"
                :to="`/picture/${item.id}`"
              >
                <v-card-text class="pa-0">
                  <v-img :src="$img.secdra(item.url, `specifiedWidth`)"></v-img>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </div>
      </div>
      <v-pagination
        :value="pageable.page"
        :length="page.totalPages"
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
import { throttle } from "../../assets/script/util/heighten"
import { LIST_GAP, LIST_ITEM_WIDTH } from "../../assets/script/constant"
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
      throttle: throttle(this.resize, 16)
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
  margin: 4px;
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
