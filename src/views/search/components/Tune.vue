<template>
  <v-card>
    <v-card-title class="title">
      显示选项
    </v-card-title>
    <v-card-text>
      <div>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field
              label="图片名"
              outlined
              dense
              clearable
              v-model="form.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-select
              v-model="form.precise"
              :items="preciseOptions"
              item-text="value"
              item-value="key"
              label="精准搜索"
              clearable
              dense
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-select
              v-model="form.aspectRatio"
              :items="Object.values($enum.AspectRatio)"
              item-text="value"
              item-value="key"
              label="纵横比"
              clearable
              dense
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" class="py-0">
            <date-picker-range-text-field
              :start-date.sync="form.startDate"
              :end-date.sync="form.endDate"
              no-title
              :max="new Date().toISOString().substr(0, 10)"
            >
              <template v-slot="{ on, date }">
                <v-text-field
                  :value="date.join(' - ')"
                  clearable
                  label="上传日期"
                  readonly
                  outlined
                  dense
                  v-on="on"
                  @click:clear="clearQueryDate"
                ></v-text-field>
              </template>
            </date-picker-range-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="$emit('close')">
        取消
      </v-btn>
      <v-btn color="info" text @click="$emit('query', form)">
        确认
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {
    "date-picker-range-text-field": () =>
      import("@/plugins/zg/components/DatePickerRangeTextField/Index")
  },
  props: {
    input: {
      type: Object
    }
  },
  data() {
    return {
      form: this.input,
      preciseOptions: [
        { key: true, value: "开启" },
        { key: false, value: "关闭" }
      ]
    }
  },
  methods: {
    clearQueryDate() {
      this.form.startDate = undefined
      this.form.endDate = undefined
    }
  }
}
</script>

<style scoped></style>
