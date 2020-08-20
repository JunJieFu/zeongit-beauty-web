<template>
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
    <edit-btn :picture="picture" @click="privacy"></edit-btn>
  </v-speed-dial>
</template>

<script type="text/jsx">
  import { pictureService } from "@/assets/script/service"

  export default {
  components: {
    "remove-btn": () => import("./RemoveBtn"),
    "privacy-btn": () => import("./PrivacyBtn"),
    "edit-btn": () => import("./EditBtn")
  },
  props: {
    picture: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      settingsVisible: false
    }
  },
  methods: {
    async privacy() {
      await this.$confirm({ text: `您确定${this.privacyValue}该图片吗？` })
      const result = await pictureService.hide(this.picture.id)
      await this.$resultNotify(result)
      this.$emit("privacy", { detail: this.picture, privacy: result.data })
    },
    async remove(){
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
