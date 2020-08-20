<template>
  <v-card :loading="loading">
    <v-card-title class="title">
      屏蔽设置
    </v-card-title>
    <v-card-text>
      <v-list
        :dense="$vuetify.breakpoint.smAndDown"
        v-if="block && block.tagList"
      >
        <v-list-item>
          <router-link :to="`/user/${block.user.id}`">
            <avatar
              :info="block.user"
              :size="$vuetify.breakpoint.xsOnly ? 45 : 60"
            ></avatar>
          </router-link>
          <span class="ml-3">
            {{ block.user.nickname }}
          </span>
          <v-spacer></v-spacer>
          <v-list-item-action>
            <v-btn icon @click="blockUser">
              <v-tooltip top :disabled="$isMobile">
                <template v-slot:activator="{ on }">
                  <v-fab-transition>
                    <v-icon
                      style="position: absolute"
                      v-show="block.user.state === $enum.BlockState.NORMAL.key"
                      v-on="on"
                      >mdi-eye-off-outline</v-icon
                    >
                  </v-fab-transition>
                  <v-fab-transition>
                    <v-icon
                      style="position: absolute"
                      v-show="block.user.state === $enum.BlockState.SHIELD.key"
                      v-on="on"
                      >mdi-eye-outline</v-icon
                    >
                  </v-fab-transition>
                </template>
                <span>{{ blockValue(block.user.state) }}用户</span>
              </v-tooltip>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        :dense="$vuetify.breakpoint.smAndDown"
        v-if="block && block.tagList"
      >
        <v-list-item v-for="(item, index) in block.tagList" :key="item.tag">
          <v-list-item-content>
            {{ item.tag }}
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="blockTag(item.tag, index)">
              <v-tooltip top :disabled="$isMobile">
                <template v-slot:activator="{ on }">
                  <v-fab-transition>
                    <v-icon
                      style="position: absolute"
                      v-show="item.state === $enum.BlockState.NORMAL.key"
                      v-on="on"
                      >mdi-eye-off-outline</v-icon
                    >
                  </v-fab-transition>
                  <v-fab-transition>
                    <v-icon
                      style="position: absolute"
                      v-show="item.state === $enum.BlockState.SHIELD.key"
                      v-on="on"
                      >mdi-eye-outline</v-icon
                    >
                  </v-fab-transition>
                </template>
                <span>{{ blockValue(item.state) }}标签</span>
              </v-tooltip>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  pictureService,
  tagBlackHoleService,
  userBlackHoleService
} from "@/assets/script/service"

export default {
  props: {
    picture: {
      type: [Object],
      required: true
    }
  },
  data() {
    return {
      loading: false,
      block: null
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
      this.block = result.data
    },
    blockValue(key) {
      if (key === this.$enum.BlockState.NORMAL.key) return "屏蔽"
      else return "解锁"
    },
    async blockUser() {
      const result = await userBlackHoleService.block(this.block.user.id)
      await this.$resultNotify(result)
      this.block.user.state = result.data
    },
    async blockTag(tag, index) {
      const result = await tagBlackHoleService.block(tag)
      await this.$resultNotify(result)
      this.block.tagList[index].state = result.data
    }
  }
}
</script>

<style scoped></style>
