<template>
  <v-app-bar app clipped-left elevate-on-scroll>
    <v-tooltip bottom :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon
          :small="$vuetify.breakpoint.xsOnly"
          @click="collapse = !collapse"
          v-on="on"
          v-show="!searchVisible || $vuetify.breakpoint.mdAndUp"
        />
      </template>
      <span>主菜单</span>
    </v-tooltip>
    <router-link
      to="/"
      class="title mx-4"
      v-show="!searchVisible && $vuetify.breakpoint.mdAndUp"
      style="line-height: 1.5em"
    >
      Zeongit Beauty
    </router-link>
    <v-combobox
      class="search-combobox"
      v-model="tagList"
      v-show="$vuetify.breakpoint.mdAndUp || searchVisible"
      chips
      clearable
      label="搜索"
      solo
      hide-details
      multiple
      append-icon=""
      prepend-inner-icon="mdi-magnify"
      @click:prepend-inner="search"
    >
      <template v-slot:selection="{ attrs, item }">
        <v-chip v-bind="attrs" close small @click:close="removeTag(item)">
          <strong>{{ item }}</strong>
        </v-chip>
      </template>
    </v-combobox>

    <v-spacer v-show="!searchVisible" />
    <v-tooltip bottom :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          icon
          :small="$vuetify.breakpoint.xsOnly"
          class="ml-4"
          v-on="on"
          v-show="!searchVisible && $vuetify.breakpoint.smAndDown"
          @click.stop="searchVisible = !searchVisible"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      <span>搜索</span>
    </v-tooltip>
    <v-tooltip bottom :disabled="$isMobile">
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          icon
          :small="$vuetify.breakpoint.xsOnly"
          class="ml-2"
          v-on="on"
          @click="refresh"
          v-show="!searchVisible && refreshFunction"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </template>
      <span>刷新</span>
    </v-tooltip>
    <template v-if="!searchVisible">
      <v-tooltip bottom :disabled="$isMobile">
        <template v-slot:activator="{ on }">
          <v-btn
            depressed
            icon
            :small="$vuetify.breakpoint.xsOnly"
            class="ml-2"
            v-on="on"
          >
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
        </template>
        <span>消息</span>
      </v-tooltip>
      <header-apps></header-apps>
      <header-settings></header-settings>
      <header-user></header-user>
    </template>
    <v-divider class="header-divider"></v-divider>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from "vuex"

export default {
  components: {
    "header-settings": () => import("./header/Settings"),
    "header-apps": () => import("./header/Apps"),
    "header-user": () => import("./header/User")
  },
  data() {
    return { tagList: [], searchVisible: false }
  },
  watch: {
    $route: {
      handler(nweValue) {
        if (nweValue.fullPath.indexOf("/search") !== -1) {
          try {
            this.tagList = JSON.parse(nweValue.params.tagList)
          } catch (e) {
            this.tagList = [nweValue.params.tagList]
          }
        } else {
          this.tagList = []
        }
      },
      immediate: true
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
    },
    ...mapState("user", ["info"]),
    ...mapState("alive", ["refreshFunction"])
  },
  methods: {
    ...mapMutations("menu", ["MUpdateCollapse"]),
    search() {
      this.searchVisible = false
      this.$router.push(
        `/search/${encodeURIComponent(JSON.stringify(this.tagList))}`
      )
    },
    refresh() {
      this.refreshFunction && this.refreshFunction()
    },
    removeTag(name) {
      this.tagList.splice(this.tagList.indexOf(name), 1)
    },
    close() {
      this.searchVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.search-combobox::v-deep {
  .v-select__selections {
    white-space: nowrap;
    overflow: auto;
    display: block;
    line-height: 42px;
  }
  .v-select__selections {
    input {
      width: 64px;
    }
  }
}
</style>
