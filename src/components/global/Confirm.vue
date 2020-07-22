<template>
  <div>
    <template v-for="(item, index) in list">
      <v-fade-transition
        @after-leave="destroyElement(index)"
        :key="item.id"
        @hook:mounted="list[index].visible = true"
      >
        <v-overlay :dark="false" v-show="item.visible">
          <v-card width="350px">
            <v-card-title>
              <span class="headline">{{ item.title }}</span>
            </v-card-title>
            <v-card-text v-html="item.text"> </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="warning" text @click="close(item)">
                {{ item.closeText }}
              </v-btn>
              <v-btn color="info" text @click="confirm(item)">
                {{ item.confirmText }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-overlay>
      </v-fade-transition>
    </template>
  </div>
</template>

<script>
import { ConfirmViewModel } from "./model"

let id = 0
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    window.$confirm = this.push
  },
  methods: {
    destroyElement(index) {
      this.list.splice(index, 1)
    },
    /**
     * @param viewModel {ConfirmViewModel}
     */
    push(viewModel) {
      viewModel.id = id++
      return new Promise((resolve, reject) => {
        viewModel.closeCallback = (...args) => {
          reject(...args)
        }
        viewModel.confirmCallback = (...args) => {
          resolve(...args)
        }
        this.list.push(new ConfirmViewModel(viewModel))
      })
    },
    close(item) {
      item.visible = false
      item.closeCallback && item.closeCallback(this)
    },
    confirm(item) {
      item.visible = false
      item.confirmCallback && item.confirmCallback(this)
    }
  }
}
</script>

<style scoped lang="scss"></style>
