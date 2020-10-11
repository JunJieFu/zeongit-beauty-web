<template>
  <v-menu v-model="show" :close-on-content-click="false" max-width="290">
    <template v-slot:activator="{ on }">
      <slot :on="on" :date="normalizedDate"></slot>
    </template>
    <v-date-picker
      v-model="normalizedDate"
      @input="change"
      :no-title="noTitle"
      :max="max"
      :min="min"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  model: {
    prop: "date",
    event: "change"
  },
  props: {
    max: {
      default: undefined,
      type: [String]
    },
    min: {
      default: undefined,
      type: [String]
    },
    noTitle: {
      default: false,
      type: Boolean
    },
    date: {
      default: undefined,
      type: [Date, Number, String]
    }
  },
  data() {
    return {
      show: false,
      normalizedDate: this.date
    }
  },
  methods: {
    change() {
      this.show = false
      this.$emit("change", this.normalizedDate)
    }
  }
}
</script>

<style lang="scss" scoped></style>
