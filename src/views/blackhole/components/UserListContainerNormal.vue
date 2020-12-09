<template>
  <div v-if="page && page.items.length">
    <v-list class="py-0">
      <div v-for="item in page.items" :key="item.id">
        <v-list-item class="py-3">
          <router-link class="d-block" :to="`/user/${item.id}`">
            <avatar
              :info="item"
              :size="$vuetify.breakpoint.xsOnly ? 45 : 60"
            ></avatar>
          </router-link>
          <span class="flex-grow-1 ellipsis px-3">
            {{ item.nickname }}
          </span>
          <v-spacer></v-spacer>
          <v-list-item-action>
            <block-user-btn
              :user="item"
              @block="$emit('block', $event)"
            ></block-user-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <v-pagination
      :value="pageable.page"
      :length="page.meta.totalPages"
      :total-visible="7"
      @input="change"
      class="mt-4"
    ></v-pagination>
  </div>
  <div v-else-if="!loading">
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  components: {
    "block-user-btn": () => import("@/components/btn/BlockUserBtn")
  },
  props: {
    pageable: {
      type: Object,
      default: () => {}
    },
    page: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    page() {
      window.scrollTo(0, 0)
    }
  },
  computed: {
    ...mapState("menu", ["collapse"]),
    ...mapState("user", ["info"])
  },
  methods: {
    change(e) {
      this.$emit("change", e)
    }
  }
}
</script>
