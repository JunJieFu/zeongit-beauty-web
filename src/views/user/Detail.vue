<template>
  <div class="page mx-auto pa-4">
    <v-img :aspect-ratio="2" :src="$img.back(user.background)"></v-img>
  </div>
</template>

<script>
import { mapState } from "vuex"
import aliveMixin from "../../assets/script/mixin/alive"
import { userService } from "../../assets/script/service"
export default {
  mixins: [aliveMixin],
  created() {
    window.scrollTo(0, 0)
    window.app.$store?.commit("menu/MUpdateProgress", true)
    this.get(this.$route.params.id)
    window.app.$store?.commit("menu/MUpdateProgress", false)
  },
  data() {
    return { user: null }
  },
  computed: {
    ...mapState("user", ["info"])
  },
  methods: {
    async get(id) {
      this.id = id
      const result = await userService.getByTargetId(id)
      console.log(result.data)
      this.user = result.data
    }
  }
}
</script>

<style lang="scss" scoped>
$page-size: 1120px;
.page {
  max-width: $page-size;
}
</style>
