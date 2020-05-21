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
  })
}
