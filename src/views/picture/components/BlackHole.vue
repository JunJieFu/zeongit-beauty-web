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
        <v-list-item v-for="(item, index) in blackHole.tagList" :key="item.tag">
          <v-list-item-content>
            {{ item.tag }}
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
import { pictureService } from "@/assets/script/service"

export default {
  components: {
    "block-user-btn": () => import("@/components/btn/BlockUserBtn"),
    "block-tag-btn": () => import("@/components/btn/BlockTagBtn")
  },
  props: {
    picture: {
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
  computed: {
    privacyValue() {
      if (this.picture.privacy === this.$enum.BlockState.NORMAL.key)
        return "屏蔽"
      else return "解锁"
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      this.loading = true
      const result = await pictureService.getBlock(this.picture.id)
      this.loading = false
      await this.$resultNotify(result)
      this.blackHole = result.data
    },
    blockUser(state) {
      this.blackHole.user.state = state
    },
    blockTag(state, index) {
      this.blackHole.tagList[index].state = state
    }
  }
}
</script>

<style scoped></style>
