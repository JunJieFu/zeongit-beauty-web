<template>
  <div>
    <v-speed-dial
      v-model="settingsVisible"
      direction="left"
      transition="scale-transition"
    >
      <template v-slot:activator>
        <v-tooltip top :disabled="$isMobile">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              v-model="settingsVisible"
              fab
              :small="$vuetify.breakpoint.xsOnly"
            >
              <v-fab-transition>
                <v-icon style="position: absolute" v-show="settingsVisible"
                  >mdi-close</v-icon
                >
              </v-fab-transition>
              <v-fab-transition>
                <v-icon style="position: absolute" v-show="!settingsVisible"
                  >mdi-cog-outline</v-icon
                >
              </v-fab-transition>
            </v-btn>
          </template>
          <span>设置</span>
        </v-tooltip>
      </template>
      <remove-btn :picture="picture" @click="remove"></remove-btn>
      <privacy-btn :picture="picture" @click="privacy"></privacy-btn>
      <edit-btn @click="modifiedDialogVisible = true"></edit-btn>
    </v-speed-dial>
    <v-dialog
      v-model="modifiedDialogVisible"
      persistent
      max-width="100%"
      width="650px"
    >
      <modified
        :picture="picture"
        @close="modifiedDialogVisible = false"
        @success="modified"
      ></modified>
    </v-dialog>
  </div>
</template>

<script type="text/jsx">
import { pictureService } from "@/assets/script/service"

export default {
  components: {
    "remove-btn": () => import("./RemoveBtn"),
    "privacy-btn": () => import("./PrivacyBtn"),
    "edit-btn": () => import("./EditBtn"),
    "modified": () => import("./Modified"),
  },
  props: {
    picture: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      settingsVisible: false,
      modifiedDialogVisible:false
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
    async privacy() {
      await this.$confirm({ text: `您确定${this.privacyValue}该图片吗？` })
      const result = await pictureService.hide(this.picture.id)
      await this.$resultNotify(result)
      this.$emit("privacy", { detail: this.picture, privacy: result.data })
    },
    async remove() {
      await this.$confirm({
        text: {
          render() {
            return (
              <div>
                您确定删除该图片吗？
                <br />
                注意：删除后不能恢复！
              </div>
            )
          }
        }
      })
      this.$emit("remove")
    },
    modified($event){
      this.modifiedDialogVisible = false
      this.$emit('modified', $event)
    }
  }
}
</script>

<style scoped></style>
