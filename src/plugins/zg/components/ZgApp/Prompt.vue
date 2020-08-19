<template>
  <div>
    <template v-for="(item, index) in list">
      <v-fade-transition
        @after-leave="destroyElement(index)"
        :key="item.id"
        @hook:mounted="list[index].visible = true"
      >
        <v-overlay :dark="false" v-show="item.visible" class="overlay">
          <v-container class="alert">
            <v-card width="100%">
              <v-card-title>
                <span class="headline">{{ item.title }}</span>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    dense
                    :hide-details="true"
                  ></v-text-field>
                </v-form>
              </v-card-text>
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
          </v-container>
        </v-overlay>
      </v-fade-transition>
    </template>
  </div>
</template>

<script>
import { PromptViewModel } from "../../script/model/viewModel"

let id = 0
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    window.$prompt = this.push
  },
  methods: {
    destroyElement(index) {
      this.list.splice(index, 1)
    },
    /**
     * @param params {PromptViewModel}
     */
    push(params) {
      let viewModel = new PromptViewModel(params, id++)
      return new Promise((resolve, reject) => {
        viewModel.closeCallback = (...args) => {
          reject(...args)
        }
        viewModel.confirmCallback = (...args) => {
          resolve(...args)
        }
        this.list.push(viewModel)
      })
    },
    close(item) {
      item.visible = false
      item.closeCallback && item.closeCallback(item)
    },
    confirm(item) {
      item.visible = false
      item.confirmCallback && item.confirmCallback(item)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~vuetify/src/styles/styles";
@import "../../style/config";

.overlay {
  z-index: $overlay-index !important;
}

.alert {
  width: $alert-width;
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .alert {
    min-width: 100% !important;
  }
}
</style>
