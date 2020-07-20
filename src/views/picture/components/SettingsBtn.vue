<template>
  <v-speed-dial
    v-model="settingsVisible"
    direction="left"
    transition="scale-transition"
    v-if="picture && picture.user.id === info.id"
  >
    <template v-slot:activator>
      <v-tooltip bottom :disabled="$isMobile">
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
    <v-btn fab :small="$vuetify.breakpoint.xsOnly">
      <v-icon color="error">mdi-delete-outline</v-icon>
    </v-btn>
    <v-btn fab :small="$vuetify.breakpoint.xsOnly">
      <v-icon color="warning">mdi-plus</v-icon>
    </v-btn>
    <v-btn fab :small="$vuetify.breakpoint.xsOnly">
      <v-icon color="primary">mdi-pencil</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: "SettingsBtn"
}
</script>

<style scoped></style>
