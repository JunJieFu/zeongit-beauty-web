<template>
  <div class="page justify-center d-flex flex-column mx-auto pa-4">
    <v-card
      :elevation="$vuetify.breakpoint.xsOnly ? 0 : undefined"
      outlined
      :loading="loading"
    >
      <v-card-title>
        反馈
      </v-card-title>
      <v-card-subtitle>
        请告诉您在使用 Zeongit Beauty 遇到的问题，让我更好地为您服务。
      </v-card-subtitle>
      <v-card-text>
        <v-form ref="form" v-model="formValid">
          <v-row>
            <v-col cols="12" class="py-0">
              <v-textarea
                v-model="form.content"
                label="请告诉我您遇到的问题"
                outlined
                dense
                :rules="valueRules()"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                label="邮箱"
                outlined
                dense
                :rules="emailRules()"
                v-model="form.email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed @click="save">
          提交
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import rulesUtil from "@/plugins/zg/script/util/rules"
import { feedbackService } from "@/assets/script/service"
import { Feedback } from "@/views/feedback/script/model"

export default {
  data() {
    return {
      loading: false,
      formValid: false,
      form: new Feedback()
    }
  },
  methods: {
    valueRules() {
      return [rulesUtil.required("反馈")]
    },
    emailRules() {
      return [rulesUtil.email("邮箱")]
    },
    async save() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        const result = await feedbackService.save(this.form)
        this.loading = false
        await this.$resultNotify(result)
        this.$notify({ text: "提交成功", color: "success" })
        this.$emit("success", result.data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/plugins/zg/style/config";
.page {
  max-width: $small-page-size;
}
</style>
