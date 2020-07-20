<template>
  <v-btn fab :small="$vuetify.breakpoint.xsOnly" @click.stop="onClick">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-icon
            color="warning"
            style="position: absolute"
            v-show="picture.privacy === $enum.PrivacyState.PUBLIC.key"
            v-on="on"
            >mdi-eye-off-outline</v-icon
          >
        </v-fab-transition>
        <v-fab-transition>
          <v-icon
            color="warning"
            style="position: absolute"
            v-show="picture.privacy === $enum.PrivacyState.PRIVATE.key"
            v-on="on"
            >mdi-eye-outline</v-icon
          >
        </v-fab-transition>
      </template>
      <span>{{ privacyValue }}图片</span>
    </v-tooltip>
  </v-btn>
</template>

<script>
import { pictureService } from "../../../assets/script/service"

export default {
  props: {
    picture: {
      type: Object,
      required: true
    }
  },
  computed: {
    privacyValue() {
      if (this.picture.privacy === this.$enum.PrivacyState.PUBLIC.key)
        return this.$enum.PrivacyState.PRIVATE.value
      else return this.$enum.PrivacyState.PUBLIC.value
    }
  },
  methods: {
    async onClick() {
      await this.$confirm({ text: `您确定${this.privacyValue}该图片吗？` })
      const result = await pictureService.hide(this.picture.id)
      await this.$resultNotify(result)
      this.$emit("privacy", { detail: this.picture, privacy: result.data })
    }
  }
}
</script>

<style scoped></style>
