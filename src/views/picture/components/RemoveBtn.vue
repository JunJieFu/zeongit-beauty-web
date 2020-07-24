<template>
  <v-btn fab :small="$vuetify.breakpoint.xsOnly" @click.stop="onClick">
    <v-tooltip top :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-icon color="error" v-on="on">mdi-delete-outline</v-icon>
      </template>
      <span>删除图片</span>
    </v-tooltip>
  </v-btn>
</template>

<script type="text/jsx">
export default {
  methods: {
    async onClick() {
      await this.$confirm({
        text: {
          render(){
            return (<div>您确定删除该图片吗？<br />注意：删除后不能恢复！</div>)
          }
        }
      })
      this.$emit("remove")
    }
  }
}
</script>

<style scoped></style>
