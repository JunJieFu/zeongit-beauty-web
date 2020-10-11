<template>
  <div>
    <v-card-title>
      举报该图片
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="formValid">
        <v-row>
          <v-col cols="12" class="py-0">
            <v-textarea
              v-model="form.content"
              label="请告诉我您为什么要举报该图片"
              outlined
              dense
              :rules="valueRules()"
            ></v-textarea>
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
  </div>
</template>

<script>
import rulesUtil from "@/plugins/zg/script/util/rules"
import { complaintService } from "@/assets/script/service"
import { Complaint } from "@/views/picture/script/model"

export default {
  props: {
    id: {
      type: [String, null, undefined],
      default: undefined
    }
  },
  data() {
    return {
      loading: false,
      formValid: false,
      form: new Complaint(this.id)
    }
  },
  methods: {
    valueRules() {
      return [rulesUtil.required("举报信息")]
    },
    async save() {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loading = true
        const result = await complaintService.save(this.form)
        this.loading = false
        await this.$resultNotify(result)
        this.$notify({ text: "提交成功", color: "success" })
        this.$emit("success", result.data)
      }
    }
  }
}
</script>

<style scoped></style>
