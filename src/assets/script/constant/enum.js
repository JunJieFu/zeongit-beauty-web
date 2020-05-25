function enumProxy(object) {
  const o = {}
  Object.keys(object).forEach((key) => {
    o[key] = { key, value: object[key] }
  })
  return o
}

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
  CollectState: enumProxy({
    CONCERNED: "已关注",
    STRANGE: "未关注",
    SElF: "自己"
  }),
  FollowState: enumProxy({
    CONCERNED: "已关注",
    STRANGE: "未关注",
    SElF: "自己"
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
