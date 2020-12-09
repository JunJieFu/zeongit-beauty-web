import heighten from "@/plugins/zg/script/util/heighten"

const { enumProxy } = heighten
export default {
  VerificationCodeOperation: ["注册账号", "忘记密码"],
  Gender: ["男孩", "女孩", "未知", "不便透露"],
  PrivacyState: ["公开", "隐藏"],
  AspectRatio: ["横图", "竖图", "方图"],
  CollectState: ["未关注", "已关注", "自己"],
  FollowState: ["未关注", "已关注", "自己"],
  BlockState: ["正常", "屏蔽"],
  ListMode: enumProxy({
    WATERFALL: "瀑布流",
    NORMAL: "正常"
  }),
  ListModeComponentName: enumProxy({
    WATERFALL: "list-container-waterfall",
    NORMAL: "list-container-normal"
  })
}
