export class Result {
  /**
   * 统一返回
   * @param {Number} status
   * @param {Object} data
   * @param {String}message
   */
  constructor(status, data, message) {
    this.status = status
    this.data = data
    this.message = message
  }
}

export class Pageable {
  /**
   * 分页
   * @param {*}page
   * @param {*}size
   * @param {String}sort
   */
  constructor(page = 1, size = 20, sort = "") {
    this.page = parseInt(page || 1) || 1
    this.size = parseInt(size)
    this.sort = sort
  }
}

export class SignInTipDetail {
  constructor(icon, title, text) {
    this.icon = icon
    this.title = title
    this.text = text
  }
}

export class OptionEnum {
  /**
   * 下拉枚举
   * @param {String,Number}label
   * @param {*}value
   */
  constructor(label = 0, value = null) {
    this.label = label
    this.value = value
  }
}

export class MenuEnum {
  /**
   * 菜单枚举
   * @param {String}label
   * @param {String}path
   * @param {String}icon
   */
  constructor(label, path, icon) {
    this.label = label
    this.path = path
    this.icon = icon
  }
}

export class ColumnEnum {
  /**
   * 表列枚举
   * @param value
   * @param text
   * @param width
   * @param visibility
   */
  constructor(value, text, width, visibility = true) {
    this.value = value
    this.text = text
    this.width = width
    this.visibility = visibility
  }
}

export class SignInForm {
  constructor() {
    this.phone = null
    this.password = null
  }
}
