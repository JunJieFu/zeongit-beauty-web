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
   * @param {String|String[]}sort
   */
  constructor(page = 1, size = 16, sort = "createDate,desc") {
    this.page = parseInt(page || 1) || 1
    this.size = parseInt(size)
    if (sort instanceof Array) {
      this.sort = sort
    } else {
      this.sort = [sort]
    }
  }
}
