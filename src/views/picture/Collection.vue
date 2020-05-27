<template>
  <div>
    <v-card-text v-if="collectorPage" class="pa-0">
      <v-list class="py-0">
        <template v-for="collector in collectorPage.content">
          <v-divider :key="collector.id"></v-divider>
          <v-list-item class="py-3" :key="collector.id">
            <div style="width: 60px">
              <v-img :src="$img.head(collector.avatarUrl)" class="circle" />
            </div>
            <span class="flex-grow-1 ellipsis px-3">
              {{ collector.nickname }}
            </span>
            <v-menu offset-y :disabled="!!info">
              <template v-slot:activator="{ on: onMenu }">
                <v-btn color="primary" depressed v-on="onMenu">
                  {{
                    collector.focus === $enum.FollowState.CONCERNED.key
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
        </template>
      </v-list>
    </v-card-text>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { collectionService } from "../../assets/script/service"
import { Pageable } from "../../assets/script/model"

export default {
  data() {
    return {
      id: this.$route.params.id,
      collectorPage: null
    }
  },
  computed: {
    ...mapState("user", ["info"]),
    picture() {
      return this.$parent.picture
    }
  },
  async created() {
    this.paging()
  },
  methods: {
    async paging() {
      const result = await collectionService.pagingUser(
        new Pageable(1, 20, "createDate,desc"),
        this.id
      )
      this.collectorPage = result.data
    }
  }
}
</script>
