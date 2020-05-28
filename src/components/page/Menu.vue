<template>
  <v-navigation-drawer v-model="collapse" app clipped temporary>
    <v-divider v-show="$vuetify.breakpoint.lgAndUp"></v-divider>
    <v-list :dense="$vuetify.breakpoint.smAndDown" class="pt-0">
      <v-list-item-group>
        <v-list-item
          color="primary"
          v-for="item in menuList"
          :key="item.path"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.label"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>
      <v-list-item class="d-block">
        <v-chip
          class="mr-2 my-1"
          small
          v-for="item in tagList"
          :key="item"
          :to="`/search/${encodeURI(item)}`"
        >
          {{ item }}
        </v-chip>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-divider></v-divider>
      <v-list>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>
              <a class="related">关于</a><span class="px-2">●</span
              ><a class="related">协议</a>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <a class="related">联系作者</a>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import { MENU_LIST_CONSTANT } from "../../assets/script/constant"
import { tagService } from "../../assets/script/service"

export default {
  data() {
    return {
      menuList: MENU_LIST_CONSTANT,
      tagList: []
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    collapse: {
      get() {
        return this.$store.state.menu.collapse
      },
      set(val) {
        this.MUpdateCollapse(val)
      }
    }
  },
  created() {
    this.listTagTop30()
  },
  methods: {
    ...mapMutations("menu", ["MUpdateCollapse"]),
    async listTagTop30() {
      const result = await tagService.listTagTop30()
      await this.$resultNotify(result)
      this.tagList = result.data
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/color.scss";
.related {
  color: currentColor;
}
</style>
