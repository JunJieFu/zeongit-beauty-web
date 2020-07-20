<template>
  <v-row class="ma-0" justify="center" align="center" v-if="signInShow">
    <v-col cols="12" sm="7" md="5" lg="4" xl="3"> </v-col>
  </v-row>
  <router-view v-else />
</template>

<script>
export default {}
</script>

<style scoped></style>
