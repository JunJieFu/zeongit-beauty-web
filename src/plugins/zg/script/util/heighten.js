export default {
  /**
   * 防抖函数
   * @param fn {Function}
   * @param wait {Number}
   * @param immediate
   * @returns {function(...[*]=)}
   */
  debounce(fn, wait, immediate) {
    let timer
    return function() {
      const context = this
      const args = arguments
      if (timer) clearTimeout(timer)
      if (immediate) {
        const callNow = !timer
        timer = setTimeout(() => {
          timer = null
        }, wait)
        if (callNow) fn.apply(context, args)
      } else {
        timer = setTimeout(() => {
          fn.apply(context, args)
        }, wait)
      }
    }
  },

  /**
   * 节流函数
   * @param fn {Function}
   * @param wait {Number}
   * @returns {function(...[*]=)}
   */
  throttle(fn, wait) {
    // let previous = 0
    // return function() {
    //   const now = Date.now()
    //   if (now - previous > wait) {
    //     fn.apply(this, arguments)
    //     previous = now
    //   }
    // }
    let timeout
    return function() {
      const context = this
      const args = arguments
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          fn.apply(context, args)
        }, wait)
      }
    }
  },

  /**
   * 可选链
   * @param object {Object}
   * @param rest {String}
   * @returns {*|undefined}
   */
  optionalChaining(object, ...rest) {
    let tmp = object
    for (let key in rest) {
      let name = rest[key]
      tmp = tmp?.[name]
    }
    return tmp || undefined
  },
  /**
   * 枚举代理
   * @param object
   * @returns {{}}
   */
  enumProxy(object) {
    const o = {}
    Object.keys(object).forEach((key) => {
      o[key] = { key, value: object[key] }
    })
    return o
  },
  /**
   * 沉睡
   * @param wait {Number}
   * @returns {Promise<unknown>}
   */
  sleep(wait) {
    return new Promise((resolve) => {
      setTimeout(resolve, wait)
    })
  }
}
