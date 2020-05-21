/**
 * http请求的工具类
 *
 * @author fjj
 */
import axios from "axios"
import qs from "qs"
import { Result } from "../model"
import config from "../constant/config"
import storageUtil from "./storage"
axios.defaults.baseURL = config.host
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
        params,
        headers: this._getAuthorize()
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
  async post(url, body, type = "form-data") {
    let result = null
    try {
      const response = await axios.post(
        url,
        type === "json"
          ? body
          : qs.stringify(body, {
              arrayFormat: "repeat"
            }),
        {
          headers: this._getAuthorize()
        }
      )
      result = response.data
    } catch (e) {
      result = await new Result(500, e, "服务器错误")
    }
    return result
  },
  _getAuthorize() {
    return {
      accessKey: storageUtil.sessionGet("accessKey"),
      secretKey: storageUtil.sessionGet("secretKey")
    }
  }
}
