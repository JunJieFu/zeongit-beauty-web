import heighten from "@/plugins/zg/script/util/heighten"

const { enumProxy } = heighten
export default {
  VerificationCodeOperation: enumProxy({
    REGISTER: "注册账号",
    FORGET: "忘记密码"
  }),
  Gender: enumProxy({
    MALE: "男孩",
    FEMALE: "女孩",
    UNKNOWN: "未知",
    INCONVENIENT: "不便透露"
  }),
  PrivacyState: ["公开", "隐藏"],
  AspectRatio: enumProxy({
    HORIZONTAL: "横图",
    VERTICAL: "竖图",
    SQUARE: "方图"
  }),
  CollectState: ["已关注", "未关注", "自己"],
  FollowState: enumProxy({
    CONCERNED: "已关注",
    STRANGE: "未关注",
    SElF: "自己"
  }),
  BlockState: enumProxy({
    NORMAL: "正常",
    SHIELD: "屏蔽"
  }),
  ListMode: enumProxy({
    WATERFALL: "瀑布流",
    NORMAL: "正常"
  }),
  ListModeComponentName: enumProxy({
    WATERFALL: "list-container-waterfall",
    NORMAL: "list-container-normal"
  })
}
