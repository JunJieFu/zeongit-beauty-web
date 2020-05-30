<template>
  <div v-if="page && page.content.length">
    <v-list class="py-0">
      <div v-for="item in page.content" :key="item.id">
        <v-divider></v-divider>
        <v-list-item class="py-3">
          <router-link class="d-block" :to="`/user/${item.id}`">
            <v-img :src="$img.head(item.avatarUrl)" class="circle" width="60" />
          </router-link>
          <span class="flex-grow-1 ellipsis px-3">
            {{ item.nickname }}
          </span>
          <follow-btn :user="item" @follow="follow"></follow-btn>
        </v-list-item>
      </div>
      <v-divider></v-divider>
    </v-list>
    <v-pagination
      :value="pageable.page"
      :length="page.totalPages"
      :total-visible="7"
      @input="change"
      class="mt-4"
    ></v-pagination>
  </div>
  <div class="empty-container" v-else-if="!loading">
    <slot>
      <h2 class="title text-center"></h2>
    </slot>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  components: {
    "follow-btn": () => import("../btn/FollowBtn")
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
    },
    follow(data) {
      this.$emit("follow", data)
    }
  }
}
</script>
