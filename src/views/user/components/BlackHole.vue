<template>
  <v-card :loading="loading">
    <v-card-title class="title">
      屏蔽设置
    </v-card-title>
    <v-card-text>
      <v-list :dense="$vuetify.breakpoint.smAndDown" v-if="blackHole">
        <v-list-item>
          <router-link :to="`/user/${blackHole.user.id}`">
            <avatar
              :info="blackHole.user"
              :size="$vuetify.breakpoint.xsOnly ? 45 : 60"
            ></avatar>
          </router-link>
          <span class="ml-3">
            {{ blackHole.user.nickname }}
          </span>
          <v-spacer></v-spacer>
          <v-list-item-action>
            <block-user-btn
              :user="blackHole.user"
              @block="blockUser"
            ></block-user-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        :dense="$vuetify.breakpoint.smAndDown"
        v-if="blackHole && blackHole.tagList"
      >
        <v-list-item
          v-for="(item, index) in blackHole.tagList"
          :key="item.name"
        >
          <v-list-item-content>
            {{ item.name }}
          </v-list-item-content>
          <v-list-item-action>
            <block-tag-btn
              :tag="item"
              @block="blockTag($event, index)"
            ></block-tag-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { userBlackHoleService } from "@/assets/script/service"
import heightenUtil from "@/plugins/zg/script/util/heighten"

export default {
  components: {
    "block-user-btn": () => import("@/components/btn/BlockUserBtn"),
    "block-tag-btn": () => import("@/components/btn/BlockTagBtn")
  },
  props: {
    user: {
      type: [Object],
      required: true
    }
  },
  data() {
    return {
      loading: false,
      blackHole: null
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      this.loading = true
      //避免过快导致闪动
      await heightenUtil.sleep(500)
      const result = await userBlackHoleService.get(this.user.id)
      this.loading = false
      await this.$resultNotify(result)
      this.blackHole = result.data
    },
    blockUser({ state }) {
      this.blackHole.user.state = state
    },
    blockTag({ state }, index) {
      this.blackHole.tagList[index].state = state
    }
  }
}
</script>

<style scoped></style>
