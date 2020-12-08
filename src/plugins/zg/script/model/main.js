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
   * @param {*}limit
   * @param {String|String[]}sort
   */
  constructor(page = 1, limit = 16, sort = "createDate,desc") {
    this.page = parseInt(page || 1) || 1
    this.limit = parseInt(limit)
    if (sort instanceof Array) {
      this.sort = sort
    } else {
      this.sort = [sort]
    }
  }
}
