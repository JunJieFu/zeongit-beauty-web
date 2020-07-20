<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn fab :small="$vuetify.breakpoint.xsOnly" @click="onClick" v-on="on">
        <v-icon color="primary">mdi-image-edit-outline</v-icon>
      </v-btn>
    </template>
    <span>修改信息</span>
  </v-tooltip>
</template>

<script>
export default {
  methods: {
    async onClick() {
      this.$emit("edit")
    }
  }
}
</script>

<style scoped></style>
