/**
 * http请求的工具类
 *
 * @author fjj
 */
import axios from "axios"
import qs from "qs"
import { Result } from "../model/main"
import { API_HOST } from "../constant/config"
axios.defaults.baseURL = API_HOST
export default {
  /**
   * get 请求
   * @param {string} url
   * @param params
   * @returns {Promise<>}
   */
  async get(url, params) {
    let result = null
    try {
      const response = await axios.get(url, {
        params
      })
      result = response.data
    } catch (e) {
      result = await new Result(500, e, "服务器错误")
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
      result = response.data
    } catch (e) {
      result = await new Result(500, e, "服务器错误")
    }
    return result
  }
}
