import config from "../constant/config"
export default {
  PICTURE_TYPE: [
    null,
    undefined,
    "specifiedWidth",
    "specifiedHeight",
    "specifiedWidth300",
    "specifiedWidth500",
    "specifiedWidth1200",
    "specifiedHeight1200"
  ],
  PICTURE_SIZE: [null, undefined, 240, 300, 500, 1200],
  AVATAR_TYPE: [null, undefined, "small50", "small100", "small200"],
  BACKGROUND_TYPE: [null, undefined, "backCard"],
  picture(url, type) {
    if (!this.PICTURE_TYPE.includes(type))
      throw new Error(`图片样式${type}不符合规则`)
    if (url) {
      if (url.indexOf("blob") === 0 || url.indexOf("http") === 0) return url
      if (type) {
        return `${config.qiniuImg}/${url}${config.qiniuSeparator}${type}`
      } else {
        return `${config.qiniuImg}/${url}`
      }
    } else {
      return require("../../image/svg/default-picture.svg")
    }
  },
  pictureByObject({ url, height, width }, size, opposite = false) {
    if (!this.PICTURE_SIZE.includes(size))
      throw new Error(`图片尺寸${size}不符合规则`)
    if (url && height && width) {
      if (url.indexOf("blob") === 0 || url.indexOf("http") === 0) return url
      if (size) {
        const proportion = opposite ? width / height : height / width
        const prefix = proportion >= 1 ? "specifiedHeight" : "specifiedWidth"
        if (size === 240) size = ""
        return `${config.qiniuImg}/${url}${config.qiniuSeparator}${prefix +
          size}`
      } else {
        return `${config.qiniuImg}/${url}`
      }
    } else {
      return require("../../image/svg/default-picture.svg")
    }
  },
  pictureLazy(unknown, type, opposite = false) {
    let src = require("../../image/svg/default-picture.svg")
    if (typeof unknown === "string") {
      src = this.picture(unknown, type)
    } else if (typeof unknown === "object") {
      src = this.pictureByObject(unknown, type, opposite)
    } else {
      throw new TypeError("传递数据不符合规则")
    }
    return {
      src,
      error: require("../../image/svg/default-picture.svg"),
      loading: require("../../image/svg/default-picture.svg")
    }
  },
  avatar(url, type) {
    if (!this.AVATAR_TYPE.includes(type))
      throw new Error(`头像样式${type}不符合规则`)
    if (url) {
      if (url.indexOf("blob") === 0 || url.indexOf("http") === 0) return url
      if (type) {
        return `${config.qiniuHead}/${url}${config.qiniuSeparator}${type}`
      } else {
        return `${config.qiniuHead}/${url}`
      }
    } else {
      return require("../../../assets/image/svg/default-avatar.svg")
    }
  },
  avatarLazy(url, type) {
    return {
      src: this.avatar(url, type),
      error: require("../../../assets/image/svg/default-avatar.svg"),
      loading: require("../../../assets/image/svg/default-avatar.svg")
    }
  },
  background(url, type, is) {
    if (!this.BACKGROUND_TYPE.includes(type))
      throw new Error(`背景样式${type}不符合规则`)
    if (url) {
      if (url.indexOf("blob") === 0 || url.indexOf("http") === 0) return url
      if (type) {
        if (is) {
          return `${config.qiniuBack}/${url}?${type}`
        } else {
          return `${config.qiniuBack}/${url}${config.qiniuSeparator}${type}`
        }
      } else {
        return `${config.qiniuBack}/${url}`
      }
    } else {
      return require("../../image/svg/default-picture.svg")
    }
  },
  backgroundLazy(url, type, is) {
    return {
      src: this.background(url, type, is),
      error: require("../../image/svg/default-picture.svg"),
      loading: require("../../image/svg/default-picture.svg")
    }
  }
}
