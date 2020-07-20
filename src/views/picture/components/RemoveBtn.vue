<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn fab :small="$vuetify.breakpoint.xsOnly" @click="onClick" v-on="on">
        <v-icon color="error">mdi-delete-outline</v-icon>
      </v-btn>
    </template>
    <span>删除图片</span>
  </v-tooltip>
</template>

<script>
export default {
  methods: {
    async onClick() {
      await this.$confirm({ text: "您确定删除该图片吗？" })
      this.$emit("remove")
    }
  }
}
</script>

<style scoped></style>
