<template>
  <div>
    <template v-for="(item, index) in list">
      <v-fade-transition
        @after-leave="destroyElement(index)"
        :key="item.id"
        @hook:mounted="list[index].visible = true"
      >
        <v-container
          v-show="item.visible"
          class="notify"
          :class="{
            top: item.top,
            right: item.right,
            bottom: item.bottom,
            left: item.left
          }"
        >
          <v-alert
            elevation="2"
            colored-border
            :border="item.border"
            :color="item.color"
          >
            <div class="d-flex align-center">
              <div v-if="item.icon" class="mr-4">
                <v-icon :color="item.color">{{ item.icon }}</v-icon>
              </div>
              <div class="flex-grow-1">
                {{ item.text }}
              </div>
              <v-btn text fab x-small @click="item.visible = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-alert>
        </v-container>
      </v-fade-transition>
    </template>
  </div>
</template>

<script>
import { NotifyViewModel } from "../../script/model/viewModel"

let id = 0
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    window.$notify = this.push
  },
  methods: {
    destroyElement(index) {
      this.list.splice(index, 1)
    },
    /**
     * @param params {NotifyViewModel}
     */
    push(params) {
      let viewModel = new NotifyViewModel(params, id++)
      this.list.push(
        new Proxy(new NotifyViewModel(viewModel), {
          set(target, key, value) {
            if (key === "visible" && !value) {
              clearTimeout(target["timer"])
            }
            return Reflect.set(target, key, value)
          }
        })
      )
    }
  }
}
</script>

<style scoped lang="scss">
@import "~vuetify/src/styles/styles";
@import "../../style/config";

.notify {
  position: fixed;
  z-index: $overlay-index !important;
  width: 350px;
  $list: top, right, bottom, left;
  @each $i in $list {
    &.#{$i} {
      #{$i}: 0;
    }
  }
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .notify {
    min-width: 100% !important;
  }
}
</style>
