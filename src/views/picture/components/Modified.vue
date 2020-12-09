<template>
  <v-card width="100%" :loading="loading" class="overflow-x-hidden">
    <v-card-title>
      更改图片信息
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="formValid">
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field
              label="图片名"
              outlined
              dense
              :rules="nameRules()"
              v-model="form.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-textarea
              v-model="form.introduction"
              label="请用一些简单的话语描述您的这幅作品"
              outlined
              dense
              :rules="introductionRules()"
            ></v-textarea>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-combobox
              v-model="form.tagList"
              chips
              clearable
              label="标签"
              multiple
              outlined
              dense
              append-icon=""
            >
              <template v-slot:selection="{ attrs, item }">
                <v-chip
                  v-bind="attrs"
                  close
                  small
                  @click:close="removeTag(item)"
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="$emit('close')">
        取消
      </v-btn>
      <v-btn color="info" text @click="save">
        确认修改
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import rulesUtil from "@/plugins/zg/script/util/rules"
import { pictureService } from "@/assets/script/service"
export default {
  props: {
    picture: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formValid: false,
      loading: false,
      form: JSON.parse(JSON.stringify(this.picture))
    }
  },
  watch: {
    picture: {
      deep: true,
      handler(value) {
        this.form = JSON.parse(JSON.stringify(value))
      }
    }
  },
  methods: {
    nameRules() {
      return [rulesUtil.required("图片名")]
    },
    introductionRules() {
      return [rulesUtil.required("图片描述")]
    },
    removeTag(name) {
      this.form.tagList.splice(this.form.tagList.indexOf(name), 1)
    },
    async save() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        const result = await pictureService.update(this.form)
        this.loading = false
        this.$notify({ text: "修改成功", color: "success" })
        this.$emit("success", result.data)
      }
    }
  }
}
</script>

<style scoped></style>
