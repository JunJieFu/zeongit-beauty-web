<template>
  <v-menu offset-y v-model="menuShow">
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            depressed
            icon
            :small="$vuetify.breakpoint.xsOnly"
            class="mr-2"
            v-on="Object.assign(menu, tooltip)"
          >
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <span>设置</span>
      </v-tooltip>
    </template>
    <v-list class="py-0" :dense="$vuetify.breakpoint.smAndDown">
      <v-dialog v-model="modeDialogShow" max-width="280px">
        <template v-slot:activator="{ on: mode }">
          <v-list-item v-on="mode">
            切换列表显示风格
          </v-list-item>
        </template>
        <v-card>
          <v-card-title class="title">
            切换列表显示风格
          </v-card-title>
          <v-card-text>
            <v-radio-group row v-model="mode">
              <v-row>
                <v-col
                  :cols="12"
                  v-for="item in $enum.ListMode"
                  :key="item.key"
                >
                  <v-radio :label="item.value" :value="item.key"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="darkDialogShow" max-width="280px">
        <template v-slot:activator="{ on: mode }">
          <v-list-item v-on="mode">
            切换主题
          </v-list-item>
        </template>
        <v-card>
          <v-card-title class="title">
            切换主题
          </v-card-title>
          <v-card-text>
            <v-radio-group row v-model="dark">
              <v-row>
                <v-col :cols="12">
                  <v-radio label="浅色" :value="false"></v-radio>
                </v-col>
                <v-col :cols="12">
                  <v-radio label="深色" :value="true"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-list>
  </v-menu>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  data() {
    return {
      menuShow: false,
      modeDialogShow: false,
      darkDialogShow: false
    }
  },
  watch: {
    modeDialogShow(newVal) {
      if (newVal) this.menuShow = false
    },
    darkDialogShow(newVal) {
      if (newVal) this.menuShow = false
    }
  },
  computed: {
    mode: {
      get() {
        return this.$store.state.menu.mode
      },
      set(val) {
        this.MUpdateMode(val)
        this.modeDialogShow = false
      }
    },
    dark: {
      get() {
        return this.$store.state.menu.dark
      },
      set(val) {
        this.MUpdateDark(val)
        this.darkDialogShow = false
      }
    }
  },
  methods: {
    ...mapMutations("menu", ["MUpdateMode", "MUpdateDark"])
  }
}
</script>

<style scoped></style>
