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
   * @param {String}i18nKey
   * @param {String}path
   * @param {String}icon
   */
  constructor(i18nKey, path, icon) {
    this.i18nKey = i18nKey
    this.path = path
    this.icon = icon
  }
}
