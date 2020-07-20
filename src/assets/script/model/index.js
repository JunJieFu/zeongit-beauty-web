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
  constructor(page = 1, size = 16, sort = "createDate,desc") {
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

export class EmptyTipDetail {
  constructor(icon, title, text, btnDesc, to) {
    this.icon = icon
    this.title = title
    this.text = text
    this.btnDesc = btnDesc
    this.to = to
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
