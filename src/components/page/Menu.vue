<template>
  <v-navigation-drawer v-model="collapse" app clipped>
    <v-divider v-show="$vuetify.breakpoint.lgAndUp"></v-divider>
    <v-list :dense="$vuetify.breakpoint.smAndDown">
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
    </v-list>
    <v-divider></v-divider>
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
import { mapMutations } from "vuex"
import { menuListConstant } from "../../assets/script/constant"

export default {
  data() {
    return {
      menuList: menuListConstant()
    }
  },
  computed: {
    collapse: {
      get() {
        return this.$store.state.menu.collapse
      },
      set(val) {
        this.MUpdateCollapse(val)
      }
    }
  },
  methods: {
    ...mapMutations("menu", ["MUpdateCollapse"])
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/color.scss";
.related {
  color: $font-color-dark-fade;
  &:hover {
    color: $blue;
  }
}
</style>
