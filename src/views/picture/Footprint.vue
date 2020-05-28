<template>
  <div>
    <v-card-text v-if="viewerPage" class="pa-0">
      <v-divider></v-divider>
      <v-list class="py-0">
        <v-list-item
          class="py-3"
          v-for="viewer in viewerPage.content"
          :key="viewer.id"
        >
          <router-link
            :to="`/picture/${$route.params.id}/footprint/2`"
            class="d-block"
            v-ripple
          >
            <v-img
              :src="$img.head(viewer.avatarUrl)"
              class="circle"
              width="60"
            />
          </router-link>
          <span class="flex-grow-1 ellipsis px-3">
            {{ viewer.nickname }}
          </span>
          <v-menu offset-y :disabled="!!info">
            <template v-slot:activator="{ on: onMenu }">
              <v-btn
                color="primary"
                depressed
                v-on="onMenu"
                @click="$router.push(`/picture/${id}/footprint/1`)"
              >
                {{
                  viewer.focus === $enum.FollowState.CONCERNED.key
                    ? `已关注`
                    : `关注`
                }}
              </v-btn>
            </template>
            <sign-in-menu-card
              title="想要关注这个画师？"
              text="请先登录，然后才能成为该画师的粉丝。"
            ></sign-in-menu-card>
          </v-menu>
        </v-list-item>
      </v-list>
    </v-card-text>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { footprintService } from "../../assets/script/service"
import { Pageable } from "../../assets/script/model"

export default {
  data() {
    return {
      id: this.$route.params.id,
      viewerPage: null
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    picture() {
      return this.$parent.picture
    }
  },
  async created() {
    console.log("f")
    this.paging()
  },
  methods: {
    async paging() {
      const result = await footprintService.pagingUser(
        new Pageable(1, 20, "createDate,desc"),
        this.id
      )
      this.viewerPage = result.data
    }
  }
}
</script>
