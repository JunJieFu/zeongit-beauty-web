import jsCookie from "js-cookie"
/**
 * http请求的工具类
 *
 * @author fjj
 */
import axios from "axios"
import qs from "qs"
import { Result } from "../model/main"
import { API_HOST, DOMAIN } from "../constant/config"
import constant from "../constant/main"
axios.defaults.baseURL = API_HOST
export default {
  /**
   * get 请求
   * @param {string} url
   * @param {*}params
   * @returns {Promise<>}
   */
  async get(url, params) {
    let result = null
    try {
      const response = await axios.get(url, {
        params,
        paramsSerializer: (params) => {
          return qs.stringify(params, {
            arrayFormat: "repeat"
          })
        }
      })
      this._handleToken(response)
      result = response.data
    } catch (e) {
      result = await new Result(constant.PROGRAM, e, "服务器错误")
    }
    return result
  },

  /**
   * post 请求
   * @param {string} url
   * @param body
   * @param type
   * @returns {Promise<>}
   */
  async post(url, body, type = "json") {
    let result = null
    try {
      const response = await axios.post(
        url,
        type === "json"
          ? body
          : qs.stringify(body, {
              arrayFormat: "repeat"
            })
      )
      this._handleToken(response)
      result = response.data
    } catch (e) {
      result = await new Result(constant.PROGRAM, e, "服务器错误")
    }
    return result
  },

  _handleToken(response = {}) {
    const headers = response.headers || {}
    if (headers.token) {
      jsCookie.set("token", headers.token, { expires: 30, domain: DOMAIN })
    }
    if (response.data.status === constant.SIGN_IN) {
      jsCookie.remove("token", {
        domain: DOMAIN
      })
      window?.signInExceptionCallback()
    }
  }
}
