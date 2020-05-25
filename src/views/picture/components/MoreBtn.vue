<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on: onMenu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: onTooltip }">
          <v-btn
            fab
            text
            class="mx-2"
            :x-small="$vuetify.breakpoint.xsOnly"
            v-on="Object.assign(onTooltip, onMenu)"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <span>更多</span>
      </v-tooltip>
    </template>
    <v-list dense>
      <v-list-item>
        <v-list-item-content>
          加入黑名单
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          举报
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {}
</script>

<style scoped></style>
