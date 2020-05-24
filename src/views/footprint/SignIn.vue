<template>
  <div v-if="signInShow">登录</div>
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
