<template>
  <v-menu v-model="show" :close-on-content-click="false" max-width="290">
    <template v-slot:activator="{ on }">
      <slot :on="on" :date="normalizedDate"></slot>
    </template>
    <v-date-picker
      v-model="normalizedDate"
      :no-title="noTitle"
      :max="max"
      :min="min"
      range
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
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
    startDate: {
      default: undefined,
      type: [Date, Number, String]
    },
    endDate: {
      default: undefined,
      type: [Date, Number, String]
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    normalizedDate: {
      get() {
        let result = []
        if (this.startDate) {
          result.push(this.startDate)
          if (this.endDate) {
            result.push(this.endDate)
          }
        }
        return result
      },
      set(value) {
        if (value.length === 2) {
          this.show = false
        }
        this.$emit("update:startDate", value[0])
        this.$emit("update:endDate", value[1])
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
