<template>
  <v-row class="ma-0 pt-12" justify="center" align="center" v-if="signInShow">
    <v-col cols="12" sm="7" md="5" lg="4" xl="3">
      <v-card :elevation="0" class="mt-12">
        <v-card-title class="justify-center"
          ><v-icon style="font-size: 100px">mdi-star</v-icon>
        </v-card-title>
        <v-card-title class="justify-center">追寻您查走过的足迹 </v-card-title>
        <v-card-text class="text-center"
          >请先登录，才能查看到您走过的足迹。</v-card-text
        >
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <v-btn outlined color="primary">登录</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <router-view v-else />
</template>

<script>
export default {
  data() {
    return {
      signInShow: true
    }
  },
  async beforeRouteEnter(to, from, next) {
    let signInShow = true
    if (window.app.$store.state.user.info || to.params.targetId) {
      signInShow = false
    }
    next((vm) => {
      vm.signInShow = signInShow
    })
  }
}
</script>

<style scoped></style>
