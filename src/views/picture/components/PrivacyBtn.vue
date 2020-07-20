<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn fab :small="$vuetify.breakpoint.xsOnly" @click="onClick" v-on="on">
        <v-fab-transition>
          <v-icon
            color="warning"
            style="position: absolute"
            v-show="picture.privacy === $enum.PrivacyState.PUBLIC.key"
            >mdi-eye-off-outline</v-icon
          >
        </v-fab-transition>
        <v-fab-transition>
          <v-icon
            color="warning"
            style="position: absolute"
            v-show="picture.privacy === $enum.PrivacyState.PRIVATE.key"
            >mdi-eye-outline</v-icon
          >
        </v-fab-transition>
      </v-btn>
    </template>
    <span>{{ opposite() + "图片" }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    picture: {
      type: Object,
      required: true
    }
  },
  methods: {
    opposite() {
      if (this.picture.privacy === this.$enum.PrivacyState.PUBLIC.key)
        return this.$enum.PrivacyState.PRIVATE.value
      if (this.picture.privacy === this.$enum.PrivacyState.PRIVATE.key)
        return this.$enum.PrivacyState.PUBLIC.value
    },
    async onClick() {
      await this.$confirm({ text: `您确定${this.opposite()}该图片吗？` })
      this.$emit("hide")
    }
  }
}
</script>

<style scoped></style>
