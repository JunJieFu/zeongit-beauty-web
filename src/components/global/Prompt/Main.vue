<template>
  <v-overlay :value="visible" :dark="false">
    <v-card width="350px">
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="input"
            :placeholder="placeholder"
            dense
            :hide-details="true"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" text @click="close">
          {{ closeText }}
        </v-btn>
        <v-btn color="info" text @click="confirm">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
import { NOOP } from "../../../assets/script/constant"

export default {
  data() {
    return {
      input: "",
      visible: false,
      title: "提示",
      placeholder: "请输入",
      closeText: "取消",
      confirmText: "确认",
      closeCallback: NOOP,
      confirmCallback: NOOP
    }
  },
  methods: {
    close() {
      this.visible = false
      this.closeCallback && this.closeCallback(this)
    },
    confirm() {
      this.visible = false
      this.confirmCallback && this.confirmCallback(this)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/style/color";
@import "../../../assets/style/config";
</style>
